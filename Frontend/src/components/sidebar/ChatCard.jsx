import { MessageCircle, EllipsisVertical, Trash2 } from "lucide-react";
import { useState } from "react";

const ChatCard = ({ title, active, onClick, onDeleteClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleDeleteChat = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    onDeleteClick?.();
  };

  return (
    <div className="group relative">
      <button
        className={`group relative flex w-full items-center justify-between gap-3 truncate rounded-lg px-3 py-2.5 text-left transition ${
          active
            ? "bg-[#2f2f2f] text-white"
            : "text-[#d7d7d7] hover:bg-[#242424] hover:text-white"
        }`}
        onClick={onClick}
      >
        <div className="flex w-full items-center gap-3 truncate">
          <MessageCircle
            size={16}
            className="shrink-0 text-[#9b9b9b] group-hover:text-[#d7d7d7]"
          />
          <span className="truncate text-sm">{title}</span>
        </div>
        <EllipsisVertical
          onClick={handleMenuToggle}
          size={16}
          className={`transition-opacity ${
            active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />
      </button>

      {isMenuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-2 top-10 z-50 w-40 rounded-lg border border-[#3a3a3a] bg-[#2f2f2f] p-1 shadow-lg"
        >
          <div
          onClick={handleDeleteChat}
           className="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-[12px] hover:bg-[#3a3a3a]">
            <Trash2 size={14} />
             <p>Delete Chat</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatCard;
