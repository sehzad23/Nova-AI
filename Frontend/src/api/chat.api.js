import api from "./axios";



export const getChats = async () =>{

    const response = await api.get("/chat");
    return response.data.chats;
};


export const createChats = async (title) =>{
    const response = await api.post("/chat",{
        title
    })

    return response.data.chat
}

export const deleteChat = async (chatId) => {
    const response = await api.delete(`/chat/${chatId}`);
    return response.data;
};