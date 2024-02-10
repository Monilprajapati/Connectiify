import React from "react";
import Message from "./Message";
import { TbSend } from "react-icons/tb";
import { useChatContext } from "../contexts/chatContext";
import { useRef } from "react";
import { useEffect } from "react";
const ChatSection = () => {
  const {
    message,
    messages,
    currentChat,
    handleMessageChange,
    connectedRooms,
    sendMessage,
    joinRoom,
    connect,
  } = useChatContext();
  const chatAreaRef = useRef(null);
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.length > 0) {
      e.preventDefault();
      sendMessage();
    }
  };

  const chatMessages = messages[currentChat.chatName];

  useEffect(
    () =>
      chatAreaRef.current.scrollIntoView({ behavior: "smooth", block: "end" }),
    [chatMessages]
  );

  // console.log("messages:", messages);
  // console.log(currentChat.chatName);
  // console.log(chatMessages);
  return (
    <>
      <div className="w-full flex-1 h-full">
        <div className="h-full flex flex-col justify-between">
          <h1 className="text-2xl font-lato shadow-md pl-8 bg-medium-grey w-full py-6 px-5 font-bold">
            {currentChat?.chatName}
          </h1>
          <div
            ref={chatAreaRef}
            className="chatArea h-full pb-3 mt-2 pl-2 flex gap-1.5 flex-col scroll-smooth overflow-auto mx-4 md:mx-7 lg:mx-24 xl:mx-48"
          >
            {!currentChat?.isChannel ||
            connectedRooms.includes(currentChat?.chatName) ? (
              <>
                {chatMessages === null ? (
                  <div className="text-center">Loading...</div>
                ) : chatMessages?.length > 0 ? (
                  chatMessages?.map((message, index) => {
                    return (
                      <Message
                        key={index}
                        avatar={message.avatar}
                        content={message.content}
                        username={message.sender}
                      />
                    );
                  })
                ) : (
                  chatMessages?.length === 0 && (
                    <div className="text-center mt-40 my-auto text-2xl font-bold">
                      No messages yet. Be the first to send a message.
                    </div>
                  )
                )}
              </>
            ) : (
              <button
                className="my-auto bg-black w-24 h-12 text-white font-plusSans font-medium rounded-md mx-auto"
                onClick={() => {
                  joinRoom(currentChat?.chatName);
                  connect(currentChat?.chatName);
                }}
              >
                Join
              </button>
            )}
          </div>
          <div className="mx-4 md:mx-7 lg:mx-24  xl:mx-48">
            <div className="inputField flex items-center justify-between my-3 border border-black rounded-md relative">
              <textarea
                rows={message.length > 70 ? (message.length < 200 ? 3 : 5) : 1}
                type="text"
                value={message}
                placeholder="Type your message here"
                className="mr-12 font-lato text-lg py-3 pl-3 pr-2 h-full w-full bg-transparent outline-none resize-none"
                onChange={(e) => handleMessageChange(e)}
                onKeyDown={(e) => handleKeyPress(e)}
                autoFocus={true}
              />
              {message.length > 0 && (
                <button
                  className="btn absolute right-0 mr-2 bg-black text-white p-2 rounded-md"
                  onClick={() => {
                    sendMessage();
                  }}
                >
                  <TbSend className="text-xl cursor-pointer" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSection;
