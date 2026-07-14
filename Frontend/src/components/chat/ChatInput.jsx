import { ArrowRight } from "lucide-react";
import { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");

  // user message
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const sent = await onSendMessage(inputValue);

    if (sent) {
      setInputValue("");
    }
  };
  return (
    <div className="border-t border-white/10 px-3 py-3 sm:px-5 sm:py-4 lg:px-6">
      <div className="mx-auto flex w-full max-w-3xl gap-2 sm:gap-3">
        <div className=" flex min-h-12 flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-[#2f2f2f] px-3 py-2 shadow-sm sm:gap-3 sm:px-4">
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Message Nova Ai..."
            className="min-w-0  flex-1 bg-transparent text-sm text-[#f4f4f4] outline-none placeholder:text-[#9b9b9b] sm:text-base"
          />

          <button
            onClick={handleSend}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-white text-[#171717] transition hover:bg-[#e6e6e6]"
            aria-label="Send message"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <p className="mx-auto mt-2 max-w-4xl text-center text-[11px] leading-4 text-[#9b9b9b] sm:text-xs">
        Nova Ai can make mistakes and produce inaccurate information. Please verify critical information from reliable sources.
      </p>
    </div>
  );
};

export default ChatInput;
