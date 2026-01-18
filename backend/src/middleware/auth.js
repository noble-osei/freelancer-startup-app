import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

const auth = (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) return next(new AppError("Not authenticated", 401));

  try {
    const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    req.user = decoded;
    next()
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401))
  }
};

export default auth