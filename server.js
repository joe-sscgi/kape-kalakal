import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

// ROUTER
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";
import landingRouter from "./routes/landingRouter.js";

// MIDDLEWARE
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import {
  authenticateUser,
  levelOfAccess,
} from "./middleware/authMiddleware.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
}

app.use(cookieParser());
app.use(express.json());

app.use("/api/", landingRouter);
app.use("/api/dashboard/", authenticateUser, userRouter);
// app.use("/api/users/", authenticateUser, userRouter);
app.use("/api/auth/", authRouter);

// ADMIN ROUTES
app.use("/api/admin/", authenticateUser, adminRouter);

// ALTERNATIVE ROUTES
// app.use("/api/users/", authenticateUser, levelOfAccess, userRouter);
// app.use("/auth/", authRouter);
// app.use("/admin/", authenticateUser, adminRouter);

app.use(errorHandlerMiddleware);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./public")));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const port = process.env.PORT || 5100;

// process.on("uncaughtException", function (err) {
//   console.log(err);
// });

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(1, error);
  process.exit(1);
}
