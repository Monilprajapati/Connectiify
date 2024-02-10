import React from "react";
import { useState } from "react";
import { TbSend } from "react-icons/tb";
import QueryMessage from "./QueryMessage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const QuerySection = () => {
  const [message, setMessage] = useState("");
  const [queries, setQueries] = useState([
    {
      content: "How to persue a master degree in Computer Science?",
      username: "backporridge",
      upvotes: 10,
      downvotes: 2,
    },
    {
      content: "How to prepare for GATE?",
      username: "returningmus",
      upvotes: 5,
      downvotes: 1,
    },
    {
      content: "Is there any scope for freelancing in Web Development?",
      username: "uncommittedh",
      upvotes: 7,
      downvotes: 0,
    },
    {
      content: "What does it take to get into a top tier university in the US?",
      username: "starvedwhir",
      upvotes: 5,
      downvotes: 1,
    },
    {
      content: "Is any alumni working in FAANG?",
      username: "abcrayone",
      upvotes: 8,
      downvotes: 0,
    }
  ]);
  const user = useSelector((state) => state.authReducer.user);
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.length > 0) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("queries");
    if (data) {
      setQueries(JSON.parse(data));
    }
  }, []);

  const handleSubmit = () => {
    setQueries([
      {
        content: message,
        username: user.username,
        upvotes: 0,
        downvotes: 0,
      },
      ...queries,
    ]);
    localStorage.setItem("queries", JSON.stringify(queries));
    setMessage("");
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
                onClick={handleSubmit}
              >
                <TbSend className="text-xl cursor-pointer" />
              </button>
            )}
          </div>
          <div className="queries">
            {queries.map((query, index) => (
              <QueryMessage key={index} {...query} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuerySection;
