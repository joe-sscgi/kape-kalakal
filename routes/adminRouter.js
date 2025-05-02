import { Router } from "express";
import {
  validateUpdateUserInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import {
  getAllBrands,
  createBrand,
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/adminController.js";

const router = Router();

// BRANDS ROUTES
router.route("/main-brands").get(getAllBrands);
router.route("/add-brand").post(createBrand);

// END BRANDS ROUTES

// PRODUCTS ROUTES
router.route("/main-products").get(getAllProducts);
router.route("/add-product").post(createProduct);
router
  .route("/edit-product/:id")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

// END PRODUCT ROUTES

// USER ROUTES
router.route("/main-users").get(getAllUsers);
router.route("/add-user").post(createUser);
router.get("/current-user", getCurrentUser);
router
  .route("/edit-user/:id")
  .get(validateIdParam, getUser)
  .patch(validateUpdateUserInput, validateIdParam, updateUser)
  .delete(validateIdParam, deleteUser);
// END USER ROUTES

export default router;
