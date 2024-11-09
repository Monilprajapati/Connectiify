import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const CLIENTURL = process.env.CLIENT_URL;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

let users = [];

let messages = {
  Tech: [],
  Fun: [],
  Games: [],
  CE: [],
  IT: [],
  EC: [],
};

io.on("connection", (socket) => {
  socket.on("join server", (userId, username, avatar) => {
    const user = {
      username,
      id: userId,
      avatar,
    };
    users.push(user);
    io.emit("new user", user);
  });

  socket.on("join room", (roomName, cb) => {
    socket.join(roomName);
    // console.log(socket.id, "Joined", roomName);
    cb(messages[roomName]);
  });

  // socket.on("get users", (cb) => {
  //   cb(users);
  // });

  socket.on("get messages", (chatName, cb) => {
    if (typeof cb === "function") {
      cb(messages[chatName]);
    } else {
      console.error("Callback is not a function.");
    }
  });

  socket.on(
    "send message",
    ({ avatar, content, to, sender, chatName, isChannel }) => {
      if (isChannel) {
        const payload = {
          avatar,
          content,
          chatName,
          sender,
        };
        socket.to(to).emit("new message", payload);
        // console.log("Payload of new message: ", payload);
      }

      if (messages[chatName]) {
        messages[chatName].push({ sender, avatar, content });
      }
    }
  );

  socket.on("disconnect", () => {
    users = users.filter((u) => u.id !== socket.id);
    io.emit("new user", users);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log("listening on:", PORT);
});
