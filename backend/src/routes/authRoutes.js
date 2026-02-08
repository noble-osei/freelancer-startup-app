import express from "express";

import Validate from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../validators/authSchema.js";
import { login, logout, me, refresh, signup, users } from "../controllers/authController.js";
import auth from "../middleware/auth.js";
import requireRole from "../middleware/requireRole.js"

const router = express.Router();

router.post("/signup", Validate.body(signupSchema), signup);

router.post("/login", Validate.body(loginSchema), login);

router.post("/logout", auth, logout);

router.post("/refresh", refresh);

router.get("/me", auth, me);
router.get("/users", auth, requireRole(["admin"]), users)

export default router