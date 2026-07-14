import {  Menu } from "lucide-react";

const ChatHeader = ({ onOpenSidebar }) => {
  return (
    <header className="flex min-h-16 items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5 lg:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="mr-1 rounded-lg p-2 text-[#c5c5c5] transition hover:bg-[#2f2f2f] hover:text-white md:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="hidden md:block truncate text-base font-semibold text-[#f4f4f4] sm:text-lg">Nova AI Assistant</h1>
      </div>
    </header>
  );
};

export default ChatHeader;
