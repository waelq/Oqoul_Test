import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Post from "../models/postModel.js";
// @desc Fetch all Posts
// @route GET /api/posts
// @desc Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await Post.find({});
    res.json(posts);
  })
);
// @desc Fetch single Posts
// @route GET /api/posts/:id
// @desc Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
      res.json(post);
    } else {
      res.status(404);
      throw new Error("Post not Found");
    }
  })
);

export default router;
