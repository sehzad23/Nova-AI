const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
// Routes
const authRoutes = require("./routes/auth.routes")
const chatRoutes = require("./routes/chat.routes")
const messageRoutes = require("./routes/message.route")
const path = require("path")

const app = express()
// middelwares
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
// publicaly accessible folder for static files
app.use(express.static(path.join(__dirname, "../public")))


//routes
app.use("/api/auth",authRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)


// wild card for disted public folder
app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = app