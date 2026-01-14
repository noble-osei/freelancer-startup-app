import AppError from "../utils/appError.js"

const requireRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new AppError("Access denied", 403))
  };

  next()
}

export default requireRole