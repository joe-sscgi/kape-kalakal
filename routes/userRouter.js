import { Router } from "express";
import {
  validateUpdateUserInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import {
  getHomepageData,
  addToTmpCart,
  checkout,
  delItemInCart,
  getCurrentUser,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";
import { getAllProducts } from "../controllers/adminController.js";

const router = Router();

router.get("/get-data", getHomepageData);

router
  .route("/shop")
  .get(getAllProducts)
  .post(addToTmpCart)
  .post(checkout)
  .delete(delItemInCart);

router
  .route("/profile/:id")
  .get(validateIdParam, getCurrentUser)
  .patch(validateIdParam, updateUserProfile)
  .delete(validateIdParam, deleteUser);

export default router;
