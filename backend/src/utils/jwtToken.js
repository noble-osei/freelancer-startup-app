import jwt from "jsonwebtoken";

export const createAccessToken = (userId, userRole) => {
  return jwt.sign(
    { id: userId, role: userRole },
    process.env.SECRET_ACCESS_TOKEN,
    { expiresIn: "15m" }
  )
};

export const createRefreshToken = (userId, userRole) => {
  return jwt.sign(
    { id: userId, role: userRole },
    process.env.SECRET_REFRESH_TOKEN,
    { expiresIn: "7d" }
  )
};