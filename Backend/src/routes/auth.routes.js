const express = require("express")
const authController = require("../controllers/auth.controler")
const { authUser } = require("../middelwares/auth.middelware")

const router = express.Router()

router.post("/register", authController.registerController)
router.post("/login",authController.loginUser)
router.get("/user", authUser, authController.getUserDetails)
router.post("/logout", authController.logoutUser)

module.exports = router
