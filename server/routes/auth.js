import { Router } from "express";
import {
  getUserInfo,
  login,
  register,
  updateProfile,
  addProfileImage,
  removeProfileImage,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/Authmiddleware.js";
import multer from "multer";

const authRoutes = Router();

// Multer setup for image upload
const upload = multer({ dest: "uploads/profiles/" });

// Auth Routes
authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);

// Profile Routes
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post("/add-profile-image", verifyToken, upload.single("profile-image"), addProfileImage);

authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);

export default authRoutes;
