import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import {
  acessTokenGenerator,
  refreshTokenGenerator,
} from "../utils/generateToken.js";
import { uploadImage } from "../utils/upload.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password} = req.body;
 const  avatar= await uploadImage(req);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists with this email");
  }
  const user = new User({ name, email, password, avatar });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid emailqq or password");
  }
  const accessToken = acessTokenGenerator(user._id);
  const refreshToken = refreshTokenGenerator(user._id);
  res.status(200).json({ accessToken, refreshToken, user: user.toJSON() });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user.toJSON());
});

export const logout = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};

export const getTokensUsingRefreshToken = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const accessToken = acessTokenGenerator(user._id);
  const refreshToken = refreshTokenGenerator(user._id);
  res.status(200).json({ accessToken, refreshToken });
});
