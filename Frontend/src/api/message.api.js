import api  from "./axios"

export const getMessages = async(chatId) =>{
    const response = await api.get(`/message/${chatId}`);
    return response.data    
}