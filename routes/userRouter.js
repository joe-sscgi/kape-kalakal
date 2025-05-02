import { Router } from "express";
import {
  validateUpdateUserInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import {
  getCurrentUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router
  .route("/:id")
  .patch(validateUpdateUserInput, validateIdParam, updateUser)
  .delete(validateIdParam, deleteUser);

export default router;
