import express from "express";
import { getPosts, getPostById } from "../controllers/postController.js";

const router = express.Router();

router.route("/").get(getPosts);
router.route("/:id").get(getPostById);

export default router;
