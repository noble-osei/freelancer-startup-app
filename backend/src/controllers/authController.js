import jwt from "jsonwebtoken";

import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/appError.js";
import { createAccessToken, createRefreshToken } from "../utils/jwtToken.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const userEmailFound = await User.findOne({ email: email });
  if (userEmailFound) return next(new AppError("Email already exists", 409));

  const usernameFound = await User.findOne({ username: username });
  if (usernameFound) return next(new AppError("Username taken", 409));

  await User.create({ name, username, email, password });

  res.status(201).json({ message: "User has been successfully created" })
});

export const login = asyncHandler(async (req, res, next) => {
  const { usernameOrEmail, password, rememberMe } = req.body;
  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let user;
  if (emailFormat.test(usernameOrEmail)) {
    user = await User.findOne({ email: usernameOrEmail })
  } else {
    user = await User.findOne({ username: usernameOrEmail })
  };
  if (!user) return next(new AppError("Invalid credentials", 400));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new AppError("Invalid credentials", 400))

  const accessToken = createAccessToken(user._id, user.role);
  let refreshToken;
  if (rememberMe) {
    refreshToken = createRefreshToken(user._id, user.role);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
  };

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000
    })
    .json({ role: user.role })
});

export const logout = (req, res) => {
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ message: "Logged out"})
};

export const refresh = (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return next(new AppError("Not authenticated", 401));
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
    res.clearCookie("refreshToken");

    const accessToken = createAccessToken(decoded.id, decoded.role);
    const refreshToken = createRefreshToken(decoded.id, decoded.role);

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({ message: "Token refreshed" });
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401))
  };
};

export const me = (req, res) => {
  res.json({ role: req.user.role })
};

export const users = asyncHandler(async (req, res) => {
  const users = await User.find().select("username role");

  res.json({users});
})