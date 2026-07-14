const messageModel = require("../models/message.model");



const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await messageModel.find({
      chat: chatId,
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};

module.exports = {
  getMessages,
};