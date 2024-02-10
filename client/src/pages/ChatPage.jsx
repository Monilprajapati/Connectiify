import React from "react";
import SideBar from "../components/Sidebar";
import ChatSection from "../components/ChatSection";

const ChatPage = () => {
  return (
    <div className="flex w-full h-[calc(100vh-70px)]">
      <SideBar />
      <ChatSection />
    </div>
  );
};

export default ChatPage;
