import express from "express";
import cookieParser from "cookie-parser";

import { errorMiddleware, notFound } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.use(notFound);
app.use(errorMiddleware);

export default app