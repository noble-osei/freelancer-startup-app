import AppError from "../utils/appError.js";

export const notFound = (req, _, next) => {
  return next(new AppError(`Not Found: ${req.originalUrl}`))
};

export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    message
    //...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  })
}