import NewChatButton from "./NewChatButton";
import ChatList from "./ChatList";
import SidebarFooter from "./SidebarFooter";
import { X } from "lucide-react";

const Sidebar = ({ chats, selectedChatId, setSelectedChatId, handleCreateChat, handleDeleteChat, isOpen, onClose, onDeleteClick }) => {
  const handleNewChatClick = () => {
    handleCreateChat();
    onClose();
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-[260px] shrink-0 transform border-r border-white/10 bg-[#171717] p-3 text-[#ececec] md:static md:translate-x-0 md:flex lg:w-[280px] transition-transform duration-300 flex flex-col h-full ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="mb-4 flex items-center justify-between md:hidden">
         
        <h5 className="text-lg font-semibold text-[#f4f4f4]">Nova AI Assistant</h5>
         <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-[#c5c5c5] transition hover:bg-[#2f2f2f] hover:text-white"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>
        <NewChatButton handleCreateChat={handleNewChatClick} />
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        setSelectedChatId={(chatId) => {
          setSelectedChatId(chatId);
          onClose();
        }}
        onDeleteChat={handleDeleteChat}
        onDeleteClick={onDeleteClick}
      />
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
