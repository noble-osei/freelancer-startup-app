import express from "express";

import Validate from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../validation/validationSchemas.js";
import { login, logout, refresh, signup } from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", Validate.body(signupSchema), signup);

router.post("/login", Validate.body(loginSchema), login);

router.post("/logout", auth, logout);

router.post("/refresh", refresh);

export default router