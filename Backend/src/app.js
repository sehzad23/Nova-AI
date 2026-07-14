const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
// Routes
const authRoutes = require("./routes/auth.routes")
const chatRoutes = require("./routes/chat.routes")
const messageRoutes = require("./routes/message.route")

const app = express()
// middelwares
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
//routes
app.use("/api/auth",authRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)

module.exports = app