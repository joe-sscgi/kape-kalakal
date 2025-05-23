import { Router } from "express";
import {
  validateUpdateUserInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

// import levelOfAccess from "../middleware/authMiddleware.js";

import {
  getContentData,
  setContentData,
  getAllBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductImgs,
  getProductImgs,
  getAllUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateUser,
  deleteUser,
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/adminController.js";

const router = Router();

router.get("/current-user", getCurrentUser);

// MANAGE CONTENT ROUTES
router.route("/set-content").get(getContentData);
router.route("/set-content/:id").patch(setContentData);
// END MANAGE CONTENT ROUTES

// BRANDS ROUTES
router.route("/main-brands").get(getAllBrands);
router.route("/add-brand").post(createBrand);
router
  .route("/edit-brand/:id")
  .get(getBrand)
  .patch(updateBrand)
  .delete(deleteBrand);
// END BRANDS ROUTES

// PRODUCTS ROUTES
router.route("/main-products").get(getAllProducts);
router.route("/main-products/:search").get(getAllProducts);
router.route("/add-product").post(createProduct);
router
  .route("/edit-product/:id")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);
router.route("/product-imgs/:id").get(getProductImgs);
router.post("/product-imgs/:id", upload.array("prodImg", 5), createProductImgs);
router.route("/product-gallery/:id").get(getProductImgs);
// END PRODUCT ROUTES

// USER ROUTES
router.route("/main-users").get(getAllUsers);
router.route("/add-user").post(createUser);
router
  .route("/edit-user/:id")
  .get(getUser)
  .patch(validateUpdateUserInput, updateUser)
  .delete(validateIdParam, deleteUser);
// END USER ROUTES

// RECIPES ROUTES
router.route("/main-recipes").get(getAllRecipes);
router.route("/add-recipe").post(createRecipe);
router
  .route("/edit-recipe/:id")
  .get(getRecipe)
  .patch(updateRecipe)
  .delete(deleteRecipe);

// END RECIPES ROUTES

// OFFLINE DESIGNING
router.route("/util/users-archive");
router.route("/util/products-archive");
router.route("/util/brands-archive");

export default router;
