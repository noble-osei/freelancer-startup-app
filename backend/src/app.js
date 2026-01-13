import express from "express";
import cookieParser from "cookie-parser";

import { errorMiddleware, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(notFound);
app.use(errorMiddleware);

export default app