import React from "react";
import { useSelector } from "react-redux";

const Message = ({ avatar, content, username }) => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div className={`flex`}>
      <div className="img w-12 h-12 p-2 md:w-14 md:h-14">
        <img src={avatar} alt="" className="w-full rounded-full h-full" />
      </div>
      <div
        className={`message ${
          username === user.username ? "bg-medium-grey" : "bg-lightGray"
        } text-black  flex flex-wrap mt-4 py-1 px-3 font-lato w-fit rounded-xl rounded-tl-none`}
      >
        <div className="flex flex-col">
          <span className="text-sm text-dark-grey font-semibold">
            {username === user.username ? "You" : username}
          </span>
          <span className="text-lg">{content}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
