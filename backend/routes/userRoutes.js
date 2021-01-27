import express from "express";
// import { updateUser } from "../../frontend/src/action/userAction.js";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  // getUsersById,
  // updataUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/:id").delete(protect, admin, deleteUser);
// .get(protect, admin, getUsersById)
// .put(protect, admin, updateUser);

export default router;
