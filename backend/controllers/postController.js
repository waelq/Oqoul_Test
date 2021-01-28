import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

// @desc Fetch All posts
// @route GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});
// @desc Fetch single post
// @route GET /api/posts/:id
// @access Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});
// @desc Delete a post
// @route DELETE /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.remove();
    res.json({ message: "Post Removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});
// @desc Create a post
// @route POST /api/posts
// @access Private
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    user: req.user._id,
    title: "sample title",
    text: "sample text",
  });
  const createdPost = await post.save();
  res.status(201).json(createdPost);
});
// @desc Update a Post
// @route PUT /api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const { title, text } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title;
    post.text = text;

    const updatedPost = await post.save();
    res.status(201).json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found to update");
  }
});
// @desc Fetch  user posts
// @route GET /api/posts
// @access Privat/User
const getPostsUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const posts = await Post.find({ user: req.params.id });
    res.json(posts);
    // if (posts) {
    //   res.json(posts);
    // }
    // else {
    //   res.status(404);
    //   throw new Error("Post not found");
    // }
  } catch (error) {
    console.error(error);
  }
};

export {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  getPostsUser,
};
