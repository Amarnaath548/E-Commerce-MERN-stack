import express from "express";
import {
  register,
  login,
  getProfile,
  logout,
  getTokensUsingRefreshToken,
} from "../controller/AuthController.js";
import { protect, refreshProtect } from "../middleware/authMiddleware.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/authValidator.js";
import { validateRequest } from "../middleware/validateRequest.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidator, validateRequest, register);

authRouter.post("/login", loginValidator, validateRequest, login);

authRouter.get("/profile", protect, getProfile);

authRouter.post("/logout", protect, logout);

authRouter.get("/refreshtoken", refreshProtect, getTokensUsingRefreshToken);

export default authRouter;
