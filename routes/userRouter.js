import { Router } from "express";
import {
  validateUpdateUserInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import {
  getCurrentUser,
  updateUser,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router
  .route("/:id")
  .patch(validateUpdateUserInput, validateIdParam, updateUser)
  .delete(validateIdParam, deleteUser);
router
  .route("/profile/:id")
  .get(validateIdParam, getCurrentUser)
  .patch(validateIdParam, updateUserProfile);

export default router;
