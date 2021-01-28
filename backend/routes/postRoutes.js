import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  getPostsUser,
} from "../controllers/postController.js";

const router = express.Router();

router.route("/").get(getPosts).post(protect, createPost);
router
  .route("/:id")
  .get(getPostById)
  .delete(protect, deletePost)
  .put(protect, updatePost);

router.route("/user/:id").get(protect, getPostsUser);

export default router;
