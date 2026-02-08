import AppError from "../utils/appError.js";

class Validate {
  static body(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { stripUnknown: true });

      if (error) return next(new AppError(error.details[0].message, 400));

      next()
    }
  };

  static params(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.params, { stripUnknown: true });

      if (error) return next(new AppError(error.details[0].message, 400));

      next()
    }
  };
};

export default Validate