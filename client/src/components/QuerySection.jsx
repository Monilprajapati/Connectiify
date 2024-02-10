import React from "react";
import { useState } from "react";
import { TbSend } from "react-icons/tb";

const QuerySection = () => {
  const [message, setMessage] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.length > 0) {
      e.preventDefault();
      console.log("send message");
    }
  };

  return (
    <div className="w-full flex-1 h-full">
      <div className="mx-4 md:mx-7 lg:mx-24  xl:mx-48">
        <h1 className="text-2xl mt-5 font-medium ">Connect with your Alumni</h1>
        {/* Input field */}
        <div className="mt-5 flex flex-col gap-3">
          <div className="inputField flex items-center justify-between my-3 border border-black rounded-sm relative">
            <textarea
              rows={message.length > 70 ? (message.length < 200 ? 3 : 5) : 1}
              type="text"
              value={message}
              placeholder="Write your queries here..."
              className="mr-12 font-lato text-lg py-3 pl-3 pr-2 h-full w-full bg-transparent outline-none resize-none"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={(e) => handleKeyPress(e)}
              autoFocus={true}
            />
            {message.length > 0 && (
              <button
                className="btn absolute right-0 mr-2 bg-black text-white p-2 rounded-md"
                onClick={() => {
                  console.log("send message");
                }}
              >
                <TbSend className="text-xl cursor-pointer" />
              </button>
            )}
          </div>
          <div className="queries">
           <QuerySection
           content="How to prepare for placements?"
            username="John Doe"
            upvotes={5}
            downvotes={0}
           />
          </div>  
        </div>
      </div>
    </div>
  );
};

export default QuerySection;
