import Chatroom from "../models/Chatroom.js";
import asyncHandler from "express-async-handler";

// @desc Create new chatroom
// @route POST /api/chatroom
// @access Privet
const createChatroom = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) throw "Chatroom with that name already exists!";

  const chatroom = new Chatroom({
    name,
  });

  await chatroom.save();

  res.json({
    message: "Chatroom created!",
  });
});
// @desc Fetch all chatroom
// @route GET /api/chatroom
// @access Privet
const getAllChatrooms = asyncHandler(async (req, res) => {
  const chatrooms = await Chatroom.find({});

  res.json(chatrooms);
});
// @desc Fetch single chatroom
// @route GET /api/chatroom/:id
// @access Privet
const getChatroom = asyncHandler(async (req, res) => {
  const chatroom = await Chatroom.findById(req.params.id);

  if (chatroom) {
    res.json(chatroom);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});
export { createChatroom, getAllChatrooms, getChatroom };
