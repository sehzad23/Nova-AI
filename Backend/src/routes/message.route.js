const express = require("express");
const router = express.Router();

const {
  getMessages,
} = require("../controllers/message.controller");

router.get("/:chatId", getMessages);

module.exports = router;