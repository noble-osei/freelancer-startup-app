import express from "express";

import Validate from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../validation/validationSchemas.js";
import { login, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", Validate.body(signupSchema), signup);

router.post("/login", Validate.body(loginSchema), login);

export default router