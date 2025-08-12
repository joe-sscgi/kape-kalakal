import { Router } from "express";
import {
  validateUpdateUserInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import {
  getHomepageData,
  getProduct,
  getAllBrandCat,
  addToTmpCart,
  checkingOut,
  checkout,
  getTmpCart,
  updateItemInCart,
  delItemInCart,
  getAllRecipeType,
  getRecipe,
  updateUserProfile,
} from "../controllers/userController.js";
import {
  getAllProducts,
  getAllBrands,
  getBrand,
} from "../controllers/adminController.js";

const router = Router();

router.get("/get-data", getHomepageData);

router.route("/shop").get(getAllProducts).post(addToTmpCart).post(checkout);
router.route("/shop/product/:id").get(getProduct);

router.route("/cart").get(getTmpCart);
router.route("/cart/:id").patch(updateItemInCart).delete(delItemInCart);
router.route("/cart/checkout").get(checkingOut);
router.route("/cart/checkout/place-order").post(checkout);

router.route("/brands").get(getAllBrands);
router.route("/brands/categories").get(getAllBrandCat);
router.route("/brands/brand/:id").get(getBrand);

router.route("/recipes/recipe-container/:type").get(getAllRecipeType);
router.route("/recipes/recipe-container/:type/:id").get(getRecipe);

router.route("/profile/:id").patch(updateUserProfile);

export default router;
