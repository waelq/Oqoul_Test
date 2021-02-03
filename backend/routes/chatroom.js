import { catchErrors } from "../middleware/errorMeddleware.js";

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getAllChatrooms,
  createChatroom,
  getChatroom,
} from "../controllers/chatroomController.js";
const router = express.Router();

router
  .route("/")
  .get(protect, catchErrors(getAllChatrooms))
  .post(protect, catchErrors(createChatroom));

router.route("/:id").get(protect, catchErrors(getChatroom));

export default router;
