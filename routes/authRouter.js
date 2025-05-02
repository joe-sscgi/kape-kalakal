import { Router } from "express";

import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";
import { register, login, logout } from "../controllers/authController.js";

const router = Router();

// router.post("/register", apiLimiter, validateRegisterInput, register);
router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

// forgot password

export default router;
