import socket from "../socket/socket";


export  const sendMessages = ({chat_id,title,content}) =>{
    socket.emit("ai-message",{
        chat_id,
        title,
        content
    })
}