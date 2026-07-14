const express = require("express")
const authMiddelware = require("../middelwares/auth.middelware")
const chatController = require("../controllers/chat.controller")


const router = express.Router()

router.post("/",authMiddelware.authUser,chatController. chatCreate)
router.get("/",authMiddelware.authUser,chatController.getAllChats)
router.delete("/:chatId",authMiddelware.authUser,chatController.deleteChat)

module.exports = router