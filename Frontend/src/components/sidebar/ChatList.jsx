
import ChatCard from "./ChatCard";

const ChatList = ({ chats = [], selectedChatId, setSelectedChatId, onDeleteChat, onDeleteClick }) => {
  const sortedChats = chats
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="mt-7 flex-1 space-y-5 overflow-y-auto pr-1">
      <div className="space-y-1">
        {sortedChats.map((chat) => (
          <ChatCard
            key={chat._id}
            chatId={chat._id}
            title={chat.title}
            active={chat._id === selectedChatId}
            onClick={() => setSelectedChatId(chat._id)}
            onDelete={onDeleteChat}
            onDeleteClick={() => onDeleteClick(chat)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
