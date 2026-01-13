import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const signup = asyncHandler(async(req, res) => {
  const { name, username, email, password } = req.body;

  await User.create({ name, username, email, password });

  res.status(201).json({
    success: true,
    message: "User has been successfully created"
  })
});