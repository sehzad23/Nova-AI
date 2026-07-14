const { Server, Socket } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const useModel = require("../models/user.model");
const chatModel = require("../models/chat.model");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vactor.service");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  //middelware in socket.io
  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    console.log("Socket connection cookie", cookies);

    if (!cookies.token) {
      console.log("Socket auth failed: token cookie missing");
      return next(new Error("Authentication: no token provided"));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY);
      const user = await useModel.findById(decoded.id);
      socket.user = user;
      next();
    } catch (error) {
      console.log("Socket auth failed:", error.message);
      return next(new Error("Authentication: invalid token"));
    }
  });

  io.on("connection", (socket) => {
    // console.log("connected user", socket.user);
    // console.log("New Socket connetion", socket.id);
    // this is user message from the frontend side.
    socket.on("ai-message", async (messagePayload) => {
      console.log("chat content", messagePayload);

      let chatId = messagePayload.chat_id;

      if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
        const fallbackChat = await chatModel.create({
          user: socket.user._id,
          title: messagePayload.title?.trim() || "New chat",
        });
        chatId = fallbackChat._id;
      }

      const [message, vectors] = await Promise.all([
        messageModel.create({
          chat: chatId,
          user: socket.user._id,
          content: messagePayload.content,
          role: "user",
        }),
        aiService.generateVectors(messagePayload.content),
      ]);

      /*
      // this is out long term memory
      const memory = await queryMemory({
        queryVector: vectors,
        limit: 3,
        metadata: {
          user: socket.user._id
        },
      });
      console.log("Memory", memory);
      */

      // Storign vectors in memory inside pinecone
      await createMemory({
        vectors,
        messageId: message._id,
        metadata: {
          chat: chatId,
          user: socket.user._id,
          text: messagePayload.content,
        },
      });

      /*
      // chat history short term memory
      const chatHistory = (
        await messageModel
          .find({
            chat: messagePayload.chat_id,
          })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
      ).reverse();
      console.log("chat Histoy");
    */

      const [memory, chatHistory] = await Promise.all([
        queryMemory({
          queryVector: vectors,
          limit: 3,
          metadata: {
            user: socket.user._id,
          },
        }),
        messageModel
          .find({
            chat: chatId,
          })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
          .then((messages) => messages.reverse()),
      ]);

      const stm = chatHistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.content }],
        };
      });

      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `
                 these are some previous messages from the chat, use  them  to generate a response
                 ${memory.map((itme) => itme.metadata.text).join("\n")}
                `,
            },
          ],
        },
      ];

      console.log("LTM", ltm[0]);
      console.log("stm", stm);
      // ai response message stm
      const response = await aiService.generateResponse([...ltm, ...stm]);
      console.log(response);

      /*
      // saving ai-model in DB
      const responseMessage = await messageModel.create({
        chat: messagePayload.chat_id,
        user: socket.user._id,
        content: response,
        role: "model",
      });

      // ai message ko convert kiya vectors me.
      const responseVectors = await aiService.generateVectors(response);
   */

      socket.emit("ai-response", {
        content: response,
        chat: chatId,
        title: messagePayload.title?.trim() || "New chat",
        
      });

      const [responseMessage, responseVectors] = await Promise.all([
        messageModel.create({
          chat: chatId,
          user: socket.user._id,
          content: response,
          role: "model",
        }),
        aiService.generateVectors(response),
      ]);

      // ai response vectorse ko store kiya for long term memory ke liye.
      await createMemory({
        vectors: responseVectors,
        messageId: responseMessage._id,
        metadata: {
          chat: chatId,
          user: socket.user.id,
          text: response,
        },
      });
    });
  });
}

module.exports = initSocketServer;
