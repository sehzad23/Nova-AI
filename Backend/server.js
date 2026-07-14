require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/db/db")
const initSocketServer = require("./src/sockets/socket.server")
// here i am using httpServer bcs we are useing Socket id so we need this server bcs normal express can not full fill our request.
const httpServer = require("http").createServer(app)

// data base connection function
connectDB()
// initiliging socker server
initSocketServer(httpServer)


httpServer.listen(3000, ()=>{
    console.log("Server is running on Port no. 3000")
})