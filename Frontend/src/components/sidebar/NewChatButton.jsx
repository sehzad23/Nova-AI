import { Plus } from "lucide-react";

const NewChatButton = ({ handleCreateChat }) => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleCreateChat}
        className="flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-white transition hover:bg-[#3a3a3a]"
      >
        <Plus size={18} />
        New Chat
      </button>
    
    </div>
  );
};

export default NewChatButton;
