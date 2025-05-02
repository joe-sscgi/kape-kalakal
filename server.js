import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import cookieParser from "cookie-parser";

// ROUTER
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";

// MIDDLEWARE
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import {
  authenticateUser,
  levelOfAccess,
} from "./middleware/authMiddleware.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/users/", authenticateUser, userRouter);
app.use("/api/v1/auth/", authRouter);

// ADMIN ROUTES
app.use("/api/v1/admin/", authenticateUser, adminRouter);

// ALTERNATIVE ROUTES
// app.use("/api/v1/users/", authenticateUser, levelOfAccess, userRouter);
// app.use("/auth/", authRouter);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
