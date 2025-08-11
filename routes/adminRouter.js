import { Router } from "express";
import {
  validateUpdateUserInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
// import { levelOfAccess } from "../middleware/authMiddleware.js";

import {
  getAdminDashboardData,
  getContentData,
  setContentData,
  getFotmProducts,
  getBestProducts,
  getFeatBrands,
  getAllBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  replenishProduct,
  deleteProduct,
  createProductImgs,
  getProductImgs,
  getAllUsers,
  getUser,
  getCurrentUser,
  getUserProfile,
  updateProfile,
  createUser,
  updateUser,
  deleteUser,
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  getAllArchiveBrands,
  restoreArchiveBrand,
  deleteArchiveBrand,
  getAllArchiveProducts,
  restoreArchiveProduct,
  deleteArchiveProduct,
  getAllArchiveRecipes,
  restoreArchiveRecipe,
  deleteArchiveRecipe,
  getAllArchiveUsers,
  restoreArchiveUser,
  deleteArchiveUser,
} from "../controllers/adminController.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/profile", getUserProfile);
router.route("/profile/:id").patch(updateProfile);

// ADMIN DASHBOARD ROUTES
router.get("/get-data", getAdminDashboardData);

// MANAGE CONTENT ROUTES
router.route("/set-content").get(getContentData);
router.route("/set-content/:id").patch(setContentData);
router.route("/set-content/fotm").get(getFotmProducts);
router.route("/set-content/fotm/:id").patch(setContentData);
router.route("/set-content/best-sellers").get(getBestProducts);
router.route("/set-content/best-sellers/:id").patch(setContentData);
router.route("/set-content/featured-brands").get(getFeatBrands);
router.route("/set-content/featured-brands/:id").patch(setContentData);

// END MANAGE CONTENT ROUTES

// BRANDS ROUTES
router.route("/main-brands").get(getAllBrands);
router.route("/add-brand").post(createBrand);
router.route("/edit-brand/:id").get(getBrand).patch(updateBrand);
// .delete(deleteBrand);
router.route("/del-brand/:id").patch(deleteBrand);
// END BRANDS ROUTES

// PRODUCTS ROUTES
router.route("/main-products").get(getAllProducts);
router.route("/main-products/:search").get(getAllProducts);
router.route("/add-product").post(createProduct);
router.route("/edit-product/:id").get(getProduct).patch(updateProduct);
router.route("/replenish-product/:id").patch(replenishProduct);
router.route("/del-product/:id").patch(deleteProduct);
// .delete(deleteProduct);
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
  .patch(validateUpdateUserInput, updateUser);
// .delete(validateIdParam, deleteUser);
router.route("/del-user/:id").patch(deleteUser);

// END USER ROUTES

// RECIPES ROUTES
router.route("/main-recipes").get(getAllRecipes);
router.route("/add-recipe").post(createRecipe);
router.route("/edit-recipe/:id").get(getRecipe).patch(updateRecipe);
// .delete(deleteRecipe)
router.route("/del-recipe/:id").patch(deleteRecipe);

// END RECIPES ROUTES

// UTILITIES ROUTES
router.route("/utilities/archive-brands").get(getAllArchiveBrands);
router
  .route("/utilities/archive-brands/:id")
  .patch(restoreArchiveBrand)
  .delete(deleteArchiveBrand);

router.route("/utilities/archive-products").get(getAllArchiveProducts);
router
  .route("/utilities/archive-products/:id")
  .patch(restoreArchiveProduct)
  .delete(deleteArchiveProduct);

router.route("/utilities/archive-recipes").get(getAllArchiveRecipes);
router
  .route("/utilities/archive-recipes/:id")
  .patch(restoreArchiveRecipe)
  .delete(deleteArchiveRecipe);

router.route("/utilities/archive-users").get(getAllArchiveUsers);
router
  .route("/utilities/archive-users/:id")
  .patch(restoreArchiveUser)
  .delete(deleteArchiveUser);
// END UTILITIES ROUTES

// OFFLINE DESIGNING

export default router;
