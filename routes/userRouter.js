import { Router } from "express";
import {
  validateUpdateUserInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import {
  getHomepageData,
  addToTmpCart,
  checkingOut,
  checkout,
  getTmpCart,
  updateItemInCart,
  delItemInCart,
  getAllRecipeType,
  getRecipe,
  getCurrentUser,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";
import { getAllProducts } from "../controllers/adminController.js";

const router = Router();

router.get("/get-data", getHomepageData);

router.route("/shop").get(getAllProducts).post(addToTmpCart).post(checkout);

router.route("/cart").get(getTmpCart);
router.route("/cart/:id").patch(updateItemInCart).delete(delItemInCart);
router.route("/cart/checkout").get(checkingOut);

router.route("/recipes/recipe-container/:type").get(getAllRecipeType);
router.route("/recipes/recipe-container/:type/:id").get(getRecipe);

router.route("/profile/:id").patch(updateUserProfile);

export default router;
