const chatModel = require("../models/chat.model");

async function chatCreate(req, res) {
  const { title } = req.body;
  const user = req.user;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Chat title is required",
    });
  }

  const chat = await chatModel.create({
    user: user._id,
    title,
  });

  res.status(200).json({
    message: "Chat created succesully",
    chat: {
      _id: chat._id,
      title: chat.title,
      lastActivity: chat.lastActivity,
      user: chat.user,
    },
  });
}

async function getAllChats(req, res) {
  const chats = await chatModel
    .find({ user: req.user._id })
    .sort({ lastActivity: -1 });

  res.status(200).json({
    chats,
  });
}


// delete chat API
async function deleteChat(req,res){
 
  const {chatId} = req.params;

  const chat = await chatModel.findOneAndDelete({_id:chatId,user:req.user._id})

  if(!chat){
    return res.status(404).json({
      message:"Chat not found"
    })
  }

  res.status(200).json({
    message:"Chat deleted successfully"
  })    

}




module.exports = {
  chatCreate,
  getAllChats,
  deleteChat
};
