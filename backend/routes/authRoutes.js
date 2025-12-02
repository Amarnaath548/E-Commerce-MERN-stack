import express from "express";
import {
  register,
  login,
  getProfile,
  logout,
  getTokensUsingRefreshToken,
} from "../controller/authController.js";
import { protect, refreshProtect } from "../middleware/authMiddleware.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/authValidator.js";
import { validateRequest } from "../middleware/validateRequest.js";
import upload from "../config/multer.js";

const authRouter = express.Router();

authRouter.post("/register",upload.single("avatar"), registerValidator, validateRequest, register);

authRouter.post("/login", loginValidator, validateRequest, login);

authRouter.get("/profile", protect, getProfile);

authRouter.post("/logout", protect, logout);

authRouter.get("/refreshtoken", refreshProtect, getTokensUsingRefreshToken);

export default authRouter;
