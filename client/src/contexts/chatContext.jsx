import { useContext, createContext } from "react";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { enableMapSet } from "immer";
import io from "socket.io-client";
enableMapSet();

import { produce } from "immer";
const ChatContext = createContext();

const socketURL = import.meta.env.VITE_SOCKET_SERVER_URL;
const ChatContextProvider = ({ children }) => {
  let initialMessages = {
    Tech: [],
    Fun: [],
    Games: [],
  };
  const [connected, setConnected] = useState(false);
  const [currentChat, setCurrentChat] = useState(() =>
    localStorage.getItem("currentChat")
      ? JSON.parse(localStorage.getItem("currentChat"))
      : { chatName: "Tech", isChannel: true, receiverId: "" }
  );

  const [connectionLoading, setConnectionLoading] = useState(false);
  const [connectedRooms, setConnectedRooms] = useState(
    localStorage.getItem("connectedRooms")
      ? JSON.parse(localStorage.getItem("connectedRooms"))
      : ["Tech", "Fun", "Games"]
  );

  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const socketRef = useRef();
  const user = useSelector((state) => state.authReducer.user);
  // console.log("messages:", messages)
  // Message from Input field
  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  // Get messages for the specified chat from the server
  function getMessages(chatName) {
    socketRef.current.emit("get messages", chatName, (chatMessages) => {
      // Update messages state for the specified chat
      setMessages((prevMessages) => ({
        ...prevMessages,
        [chatName]: chatMessages,
      }));
    });
  }

  // console.log(messages);
  useEffect(() => {
    if (currentChat.chatName) {
      connect(currentChat.chatName);
    }
  }, [currentChat]);

  // Call the function to get messages for the initial chat when needed
  useEffect(() => {
    if (connected) {
      setConnectionLoading(true);
      getMessages(currentChat.chatName)
    }

    setConnectionLoading(false);
  }, [connected, connectedRooms, messages]);

  // Send message to the server
  function sendMessage() {
    setMessage("");
    const payload = {
      avatar: user.userAvatar,
      content: message,
      to: currentChat.isChannel ? currentChat.chatName : currentChat.receiverId,
      sender: user.username,
      chatName: currentChat.chatName,
      isChannel: currentChat.isChannel,
    };

    socketRef.current.emit("send message", payload);
    // console.log(payload)
    const newMessages = produce(messages, (draft) => {
      draft[currentChat.chatName].push({
        sender: user.username,
        avatar: user.userAvatar,
        content: message,
      });
    });
    setMessages(newMessages);
  }

  // Join a room and get the messages for that room
  function joinRoomCallback(incomingMessages, room) {
    // console.log(room)
    const newMessages = produce(messages, (draft) => {
      draft[room] = incomingMessages || [];
    });
    setMessages(newMessages);
  }

  // Join a room and set the messages for that room
  function joinRoom(room) {
    const newConnectedRooms = produce(connectedRooms, (draft) => {
      draft.push(room);
    });
    localStorage.setItem("connectedRooms", JSON.stringify(newConnectedRooms));

    socketRef.current.emit("join room", room, (messages) => {
      console.log(room, messages);
      joinRoomCallback(messages, room);
    });

    setConnectedRooms(newConnectedRooms);
  }

  // toggle Channel
  function toggleChat(currentChat) {
    if (!messages[currentChat.chatName]) {
      const newMessages = produce(messages, (draft) => {
        draft[currentChat.chatName] = [];
      });
      setMessages(newMessages);
    }
    setCurrentChat(currentChat);
  }
  // connect to the server
  function connect(room) {
    setConnected(true);
    socketRef.current = io.connect(socketURL);
    socketRef.current.emit(
      "join server",
      user._id,
      user.username,
      user.userAvatar
    );
    socketRef.current.emit("join room", room, (message) => {
      joinRoomCallback(message, room);
    });

    socketRef.current.on("new message", ({ content, sender, chatName }) => {
      setMessages((messages) => {
        const newMessages = produce(messages, (draft) => {
          if (draft[chatName]) {
            draft[chatName].push({ sender, content });
          } else {
            draft[chatName] = [{ sender, content }];
          }
        });
        return newMessages;
      });
    });
  }
  return (
    <ChatContext.Provider
      value={{
        connected,
        setConnected,
        currentChat,
        setCurrentChat,
        connectedRooms,
        setConnectedRooms,
        messages,
        setMessages,
        message,
        socketRef,
        handleMessageChange,
        sendMessage,
        getMessages,
        joinRoom,
        toggleChat,
        connect,
        connectionLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error(
      "useChatContext must be within a ChatContextProvider. Make sure the component is wrapped in ChatContextProvider"
    );
  }
  return context;
};

export { ChatContextProvider, useChatContext };
