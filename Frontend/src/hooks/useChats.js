import createChats from "../api/chat.api"


export const useChats = () =>{

    const createNewChat = async(title) =>{
        return await createChats(title)
    }

    return {
        createNewChat
    }
}