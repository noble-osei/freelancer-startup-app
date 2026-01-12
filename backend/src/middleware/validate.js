import AppError from "../utils/appError.js";

class Validate {
  static body(schema) {
    return (req, res, next) => {
      const { error } = schema.Validate(req.body);

      if (error) return next(new AppError(error.detail[0].message, 400));

      next()
    }
  };

  static params(schema) {
    return (req, res, next) => {
      const { error } = schema.Validate(req.params);

      if (error) return next(new AppError(error.detail[0].message, 400));

      next()
    }
  };
};

export default Validate