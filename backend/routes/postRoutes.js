import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";

import {
  getPosts,
  getPostById,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.route("/").get(getPosts);
router.route("/:id").get(getPostById).delete(protect, deletePost);

export default router;
