import { LoaderPinwheel } from "lucide-react";

const Messages = ({ messages, selectedChatId }) => {
  const filteredMessages = messages.filter((message) => {
    const chatIdFromMessage =
      message.chatId ||
      (message.chat && typeof message.chat === "string" ? message.chat : message.chat?._id);

    return chatIdFromMessage === selectedChatId;
  });

  return (
    <div className="flex flex-1 flex-col overflow-y-auto sm:px-6 sm:py-5">
      {filteredMessages.length > 0 ? (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          {filteredMessages.map((message) => {
            const isUserMessage = message.role === "user";
            const messageText = message.text ?? message.content ?? "";

            return (
              <div
                key={message.id || message._id}
                className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%]  py-3 px-4 text-sm rounded-lg leading-6 sm:text-base ${
                    isUserMessage ? "" : "text-[#f4f4f4]"
                  }`}
                >
                  <p>{messageText}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#2f2f2f] text-[#f4f4f4] shadow-sm sm:h-16 sm:w-16">
              <LoaderPinwheel  size={28} />
            </div>
            <h2 className="text-2xl font-semibold leading-tight text-[#f4f4f4] sm:text-3xl md:text-4xl">
              Welcome to Nova AI

            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
