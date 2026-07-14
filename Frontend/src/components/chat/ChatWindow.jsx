import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import ChatInput from "./ChatInput";

const ChatWindow = ({ messages, selectedChatId, onSendMessage, onOpenSidebar }) => {
 
  return (
    <section className="flex min-w-0 flex-1 flex-col bg-[#212121]">
      <ChatHeader onOpenSidebar={onOpenSidebar} />
      <Messages messages={messages} selectedChatId={selectedChatId} />
      <ChatInput 
      onSendMessage={onSendMessage}
      />
    </section>
  );
};

export default ChatWindow;
