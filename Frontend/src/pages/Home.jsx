import Sidebar from "../components/sidebar/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import { useEffect, useState } from "react";
import socket, { connectSocket, disconnectSocket } from "../socket/socket";
import { toast } from "sonner";
import { getChats, createChats, deleteChat } from "../api/chat.api";
import { getMessages } from "../api/message.api";
import { sendMessages } from "../services/socket.service";
import DeleteChatModal from "../Model/DeleteChatModal";

const normalizeMessage = (message) => {
  const chatId =
    message.chatId ||
    (typeof message.chat === "string" ? message.chat : message.chat?._id) ||
    message.chat_id;

  return {
    ...message,
    id: message.id || message._id || `${chatId || "temp"}-${Date.now()}`,
    text: message.text ?? message.content ?? "",
    chatId,
  };
};

const Home = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // delete chat
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const appendUniqueMessage = (message) => {
    setMessages((prevMessages) => {
      if (prevMessages.some((item) => item.id === message.id)) {
        return prevMessages;
      }

      return [...prevMessages, message];
    });
  };

  useEffect(() => {
    connectSocket();

    const handleConnect = () => {
      console.log("Socket Connected", socket.id);
    };

    const handleConnectError = (error) => {
      console.error("Socket connection error:", error.message);
    };

    const handleAiResponse = (data) => {
      if (!data?.content) return;

      const incomingChatId = data.chat || data.chat_id || selectedChatId;
      if (!incomingChatId) return;

      const aiMessage = normalizeMessage({
        id: `${incomingChatId}-ai-${Date.now()}`,
        chatId: incomingChatId,
        role: "assistant",
        text: data.content,
      });

      appendUniqueMessage(aiMessage);

      if (data.title) {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat._id === incomingChatId ? { ...chat, title: data.title } : chat,
          ),
        );
      }
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("ai-response", handleAiResponse);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("ai-response", handleAiResponse);
      disconnectSocket();
    };
  }, [selectedChatId]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats = await getChats();
        setChats(chats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChatId) {
        setMessages([]);
        return;
      }

      try {
        const messages = await getMessages(selectedChatId);
        const normalizedMessages = messages.map(normalizeMessage);
        setMessages(normalizedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    };

    fetchMessages();
  }, [selectedChatId]);

  const handleCreateChat = async (initialTitle) => {
    let title = initialTitle;

    if (!title) {
      title = window.prompt("Enter Chat Title");
      // User cancelled
      if (title === null) return null;
    }

    // Empty title
    if (!title.trim()) {
      alert("Chat title is required.");
      return null;
    }

    try {
      const newChat = await createChats(title.trim());

      setChats((prevChats) => {
        if (prevChats.some((chat) => chat._id === newChat._id)) {
          return prevChats;
        }

        return [newChat, ...prevChats];
      });

      setSelectedChatId(newChat._id);
      toast.success("Chat created", {
        description: "Your chat has been created.",
      });
      return newChat;
    } catch (error) {
      console.error(error);
      toast.error("Failed to create chat", {
        description: error.response?.data?.message || "Please try again.",
      });
      return null;
    }
  };

 const handleDeleteConfirm = async () => {
  if (!selectedChat) return;

  try {
    await deleteChat(selectedChat._id);

    setChats((prevChats) =>
      prevChats.filter((chat) => chat._id !== selectedChat._id)
    );

    if (selectedChatId === selectedChat._id) {
      setSelectedChatId(null);
      setMessages([]);
    }

    setIsDeleteModalOpen(false);
    setSelectedChat(null);

    toast.success("Chat deleted", {
      description: "The chat has been removed from your list.",
    });
  } catch (error) {
    console.error(error);
  }
};

  const handleSendMessage = async (content) => {
    const trimmedContent = content.trim();
    if (!trimmedContent) return false;

    if (!selectedChatId) {
      alert("Please create a chat with a title before sending a message.");
      return false;
    }

    const activeChat = chats.find(
      (chat) => chat._id === selectedChatId || chat.id === selectedChatId,
    );

    if (!activeChat?.title?.trim()) {
      alert("Please create a chat with a title before sending a message.");
      return false;
    }

    const chatId = selectedChatId;

    const newMessage = normalizeMessage({
      id: `${chatId}-${Date.now()}`,
      chatId,
      role: "user",
      text: trimmedContent,
    });

    appendUniqueMessage(newMessage);

    sendMessages({
      chat_id: chatId,
      title: activeChat.title,
      content: trimmedContent,
    });

    return true;
  };

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleOpenDeleteModal = (chat) => {
    setSelectedChat(chat);
    setIsDeleteModalOpen(true);
  };

  return (
    <main className="flex h-dvh overflow-hidden bg-[#212121] text-[#ececec]">
      <Sidebar
        chats={chats}
        selectedChatId={selectedChatId}
        setSelectedChatId={setSelectedChatId}
        handleCreateChat={handleCreateChat}
        handleDeleteChat={handleDeleteConfirm}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        onDeleteClick={handleOpenDeleteModal}
      />
      <ChatWindow
        messages={messages}
        selectedChatId={selectedChatId}
        onSendMessage={handleSendMessage}
        onOpenSidebar={openSidebar}
      />

      <DeleteChatModal
        isOpen={isDeleteModalOpen}
        chatTitle={selectedChat?.title}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedChat(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  );
};

export default Home;
