import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatroomRoutes from "./routes/chatroom.js";

import {
  notFound,
  catchErrors,
  mongoseErrors,
} from "./Middleware/errorMeddleware.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("API is runing");
});

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chatroom", chatroomRoutes);

// route not found
app.use(notFound);
// error path in route
app.use(catchErrors);
// error mongose
app.use(mongoseErrors);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

import User from "./models/userModel.js";
import Message from "./models/Message.js";
import jwt from "jsonwebtoken";

// const io = require("socket.io")(server);
// import  from 'socket.io'
import { Server } from "socket.io";
const io = new Server(server);

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {}
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
});
