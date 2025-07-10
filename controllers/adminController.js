import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

import Brands from "../models/BrandsModel.js";
import Products from "../models/ProductsModel.js";
import Users from "../models/UsersModel.js";
import UserInfo from "../models/UserInfoModel.js";
import Recipes from "../models/RecipesModel.js";
import Products_Images from "../models/ProductImgsModel.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { response } from "express";

function createUploadPath(type, data) {
  var uploadType = "";
  var uploadCat = "";
  var uploadTypeCat = "";
  var uploadFolderName = "";
  var uploadPath = "client/src/assets/images/Uploads/";

  if (type == "product") {
    uploadType = "PRODUCTS";
    uploadCat = data.prodCat.toUpperCase().replace(/\s/g, "_");
    uploadTypeCat = uploadType + "/" + uploadCat;
    uploadFolderName = uploadFolderName = data._id;
  } else if (type == "brand") {
    uploadType = "BRANDS";
    uploadTypeCat = uploadType;
    uploadFolderName = data._id;
  }

  if (uploadTypeCat && uploadFolderName != "") {
    uploadPath += uploadTypeCat + "/" + uploadFolderName;

    fs.mkdir(uploadPath, { recursive: true })
      .then(() => console.log("Directory created successfully"))
      .catch((err) => console.error("Error creating directory:", err));
  }

  return;
}

export const getAdminDashboardData = async (req, res) => {
  const critProd = await Products.find({ prodQty: { $lte: 10 }, prodIsDel: 0 });

  const allData = {};
  allData.critProd = critProd;

  res.status(StatusCodes.OK).json({ allData });
};

// CONTENT
export const getContentDatav1 = async (req, res) => {
  const countFotm = await Products.countDocuments({ prodIsFotm: 1 });
  const countBest = await Products.countDocuments({ prodIsBest: 1 });
  const countFeature = await Brands.countDocuments({ brandIsFeatured: 1 });
  // console.log(`Total Best Seller: ${count}`);

  const brandsData = await Brands.find({}, null, {
    sort: { brandName: 1 },
  });

  const productsData = await Products.find({}, null, {
    sort: { prodName: 1 },
  });

  const allData = {};
  allData.brands = brandsData;
  allData.countFeature = countFeature;
  allData.prods = productsData;
  allData.countFotm = countFotm;
  allData.countBest = countBest;

  res.status(StatusCodes.OK).json({ allData });
};

export const getContentData = async (req, res) => {
  const brandsFeatData = await Brands.find({ brandIsFeatured: 1 }, null, {
    sort: { brandName: 1 },
  });

  const productsFotmData = await Products.find({ prodIsFotm: 1 }, null, {
    sort: { prodName: 1 },
  });

  const productsBestData = await Products.find({ prodIsBest: 1 }, null, {
    sort: { prodName: 1 },
  });

  const allData = {};
  allData.brandsFeatData = brandsFeatData;
  allData.productsFotmData = productsFotmData;
  allData.productsBestData = productsBestData;

  res.status(StatusCodes.OK).json({ allData });
};

export const setContentData = async (req, res) => {
  const contentData = req.body;

  if (contentData.manageAction == "Remove") {
    if (contentData.manageFeat == "fotm") {
      contentData.prodIsFotm = 0;
    } else if (contentData.manageFeat == "best") {
      contentData.prodIsBest = 0;
    } else if (contentData.manageFeat == "feat") {
      contentData.brandIsFeatured = 0;
    }
  } else if (contentData.manageAction == "Set") {
    if (contentData.manageFeat == "fotm") {
      contentData.prodIsFotm = 1;
    } else if (contentData.manageFeat == "best") {
      contentData.prodIsBest = 1;
    } else if (contentData.manageFeat == "feat") {
      contentData.brandIsFeatured = 1;
    }
  }

  if (contentData.manageType == "Product") {
    const updatedProd = await Products.findByIdAndUpdate(
      contentData.manageID,
      contentData
    );

    res
      .status(StatusCodes.OK)
      .json({ msg: "product updated", Products: updatedProd });
  } else if (contentData.manageType == "Brand") {
    const updatedBrand = await Brands.findByIdAndUpdate(
      contentData.manageID,
      contentData
    );
    res
      .status(StatusCodes.OK)
      .json({ msg: "brand updated", Brands: updatedBrand });
  }
};

export const getFotmProducts = async (req, res) => {
  // GET ALL PRODUCTS THAT ARE NOT FOTM
  try {
    // 1. Extract query params
    const {
      page = 1,
      limit = 15,
      sortBy = "prodName",
      sortOrder = "asc",
      category,
      search,
    } = req.query;

    const query = {};

    // FILTER NOT DELETED
    query.prodIsDel = 0;

    // FILTER NOT FOTM
    query.prodIsFotm = 0;

    // FILTER COFFEE ONLY FOR FOTM
    query.prodCat = "Coffee";

    // 2. Optional search filter
    if (search) {
      query.prodName = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // 4. Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // 5. Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // 6. Get products with pagination and sorting
    const productsData = await Products.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // 7. Get total count for pagination info
    const totalProducts = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / Number(limit));

    // 8. Attach first image to each product
    const productIds = productsData.map((p) => p._id);
    const imagesData = await Products_Images.find({
      prodImgProdID: { $in: productIds },
    }).sort({ _id: 1 });

    const firstImageByProductId = {};
    for (const img of imagesData) {
      const key = img.prodImgProdID.toString();
      if (!firstImageByProductId[key]) {
        firstImageByProductId[key] = img;
      }
    }

    const productsWithFirstImage = productsData.map((product) => ({
      ...product.toObject(),
      prodImg: firstImageByProductId[product._id.toString()] || null,
    }));

    // 9. Return the result
    res.status(StatusCodes.OK).json({
      products: productsWithFirstImage,
      currentPage: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong." });
  }
};

export const getBestProducts = async (req, res) => {
  // GET ALL PRODUCTS THAT ARE NOT BEST SELLER
  try {
    // 1. Extract query params
    const {
      page = 1,
      limit = 15,
      sortBy = "prodName",
      sortOrder = "asc",
      category,
      search,
    } = req.query;

    const query = {};

    // FILTER NOT DELETED
    query.prodIsDel = 0;

    // FILTER NOT BEST SELLER
    query.prodIsBest = 0;

    // 2. Optional search filter
    if (search) {
      query.prodName = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // 3. Optional category filter
    if (category) {
      query.prodCat = category;
    }

    // 4. Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // 5. Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // 6. Get products with pagination and sorting
    const productsData = await Products.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // 7. Get total count for pagination info
    const totalProducts = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / Number(limit));

    // 8. Attach first image to each product
    const productIds = productsData.map((p) => p._id);
    const imagesData = await Products_Images.find({
      prodImgProdID: { $in: productIds },
    }).sort({ _id: 1 });

    const firstImageByProductId = {};
    for (const img of imagesData) {
      const key = img.prodImgProdID.toString();
      if (!firstImageByProductId[key]) {
        firstImageByProductId[key] = img;
      }
    }

    const productsWithFirstImage = productsData.map((product) => ({
      ...product.toObject(),
      prodImg: firstImageByProductId[product._id.toString()] || null,
    }));

    // 9. Return the result
    res.status(StatusCodes.OK).json({
      products: productsWithFirstImage,
      currentPage: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong." });
  }
};

export const getFeatBrands = async (req, res) => {
  // GET ALL BRANDS THAT ARE NOT FEATURED
  try {
    // 1. Extract query params
    const {
      page = 1,
      limit = 10,
      sortBy = "brandName",
      sortOrder = "asc",
      category,
      search,
    } = req.query;

    const query = {};

    // FILTER NOT DELETED
    query.brandIsDel = 0;

    // FILTER NOT FEATURED
    query.brandIsFeatured = 0;

    // 2. Optional search filter
    if (search) {
      query.brandName = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // 3. Optional category filter
    if (category) {
      query.brandCat = category;
    }

    // 4. Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // 5. Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // 6. Get products with pagination and sorting
    const brandsData = await Brands.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // 7. Get total count for pagination info
    const totalBrands = await Brands.countDocuments(query);
    const totalPages = Math.ceil(totalBrands / Number(limit));

    // 9. Return the result
    res.status(StatusCodes.OK).json({
      brands: brandsData,
      currentPage: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong." });
  }
};

// PROFILE
export const getUserProfile = async (req, res) => {
  const userProfile = await UserInfo.findOne({ userUserID: req.user.userId });

  res.status(StatusCodes.OK).json({ userProfile: userProfile });
};

export const updateProfile = async (req, res) => {
  const updatedUserProfile = await UserInfo.findByIdAndUpdate(
    req.body.profileID,
    req.body
  );

  const updatedUser = await UserInfo.findByIdAndUpdate(
    req.body.userID,
    req.body
  );

  res.status(StatusCodes.OK).json({ msg: "user profile updated" });
};
// END PROFILE

// BRANDS
export const getAllBrands = async (req, res) => {
  try {
    // 1. Extract query params
    const {
      page = 1,
      limit = 10,
      sortBy = "brandName",
      sortOrder = "asc",
      category,
      search,
    } = req.query;

    const query = {};

    // FILTER NOT DELETED
    query.brandIsDel = 0;

    // 2. Optional search filter
    if (search) {
      query.brandName = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // 3. Optional category filter
    if (category) {
      query.brandCat = category;
    }

    // 4. Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // 5. Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // 6. Get products with pagination and sorting
    const brandsData = await Brands.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // 7. Get total count for pagination info
    const totalBrands = await Brands.countDocuments(query);
    const totalPages = Math.ceil(totalBrands / Number(limit));

    // 9. Return the result
    res.status(StatusCodes.OK).json({
      brands: brandsData,
      currentPage: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong." });
  }
};

export const createBrand = async (req, res) => {
  const brand = await Brands.create(req.body);
  res.status(StatusCodes.CREATED).json({ brand });
};

export const getBrand = async (req, res) => {
  const brandData = await Brands.findById(req.params.id);
  res.status(StatusCodes.OK).json({ brandData });
};

export const updateBrand = async (req, res) => {
  const updatedBrand = await Brands.findByIdAndUpdate(req.params.id, req.body);
  res
    .status(StatusCodes.OK)
    .json({ msg: "brand updated", Brands: updatedBrand });
};

export const deleteBrand = async (req, res) => {
  const deleteBrand = await Brands.findByIdAndUpdate(req.params.id, {
    brandIsDel: 1,
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "brand deleted", brand: deleteBrand });
};
// END BRANDS

// PRODUCTS
export const getAllProducts = async (req, res) => {
  // const productsData = await Products.find({});
  // res.status(StatusCodes.OK).json({ productsData });

  // MULTIPLE IMAGES
  // try {
  //   // 1. Get all products
  //   const productsData = await Products.find({});

  //   // 2. Extract all product IDs
  //   const productIds = productsData.map((product) => product._id);

  //   // 3. Find all images whose prodImgProdID matches any product ID
  //   const imagesData = await Products_Images.find({
  //     prodImgProdID: { $in: productIds },
  //   });

  //   // 4. Group images by product ID for easy lookup
  //   const imagesByProductId = imagesData.reduce((acc, image) => {
  //     const key = image.prodImgProdID.toString();
  //     if (!acc[key]) acc[key] = [];
  //     acc[key].push(image);
  //     return acc;
  //   }, {});

  //   // 5. Attach images array to each product manually
  //   const productsWithImages = productsData.map((product) => {
  //     return {
  //       ...product.toObject(),
  //       images: imagesByProductId[product._id.toString()] || [],
  //     };
  //   });

  //   res.status(StatusCodes.OK).json({ productsData: productsWithImages });
  // } catch (error) {
  //   res
  //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //     .json({ error: error.message });
  // }

  // SINGLE IMAGE
  try {
    // 1. Extract query params
    const {
      page = 1,
      limit = 15,
      sortBy = "prodName",
      sortOrder = "asc",
      category,
      search,
    } = req.query;

    const query = {};

    // FILTER NOT DELETED
    query.prodIsDel = 0;

    // 2. Optional search filter
    if (search) {
      query.prodName = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // 3. Optional category filter
    if (category) {
      query.prodCat = category;
    }

    // 4. Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // 5. Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // 6. Get products with pagination and sorting
    const productsData = await Products.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // 7. Get total count for pagination info
    const totalProducts = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / Number(limit));

    // 8. Attach first image to each product
    const productIds = productsData.map((p) => p._id);
    const imagesData = await Products_Images.find({
      prodImgProdID: { $in: productIds },
    }).sort({ _id: 1 });

    const firstImageByProductId = {};
    for (const img of imagesData) {
      const key = img.prodImgProdID.toString();
      if (!firstImageByProductId[key]) {
        firstImageByProductId[key] = img;
      }
    }

    const productsWithFirstImage = productsData.map((product) => ({
      ...product.toObject(),
      prodImg: firstImageByProductId[product._id.toString()] || null,
    }));

    // 9. Return the result
    res.status(StatusCodes.OK).json({
      products: productsWithFirstImage,
      currentPage: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong." });
  }
};

export const createProduct = async (req, res) => {
  if (req.body.prodIsFotm) {
    req.body.prodIsFotm = 1;
  } else {
    req.body.prodIsFotm = 0;
  }

  if (req.body.prodIsBest) {
    req.body.prodIsBest = 1;
  } else {
    req.body.prodIsBest = 0;
  }

  const product = await Products.create(req.body);
  createUploadPath("product", product);

  res.status(StatusCodes.CREATED).json({ product });
};

export const getProduct = async (req, res) => {
  const prodData = await Products.findById(req.params.id);
  res.status(StatusCodes.OK).json({ prodData });
};

export const updateProduct = async (req, res) => {
  if (req.body.prodIsFotm) {
    req.body.prodIsFotm = 1;
  } else {
    req.body.prodIsFotm = 0;
  }

  if (req.body.prodIsBest) {
    req.body.prodIsBest = 1;
  } else {
    req.body.prodIsBest = 0;
  }

  const updatedProd = await Products.findByIdAndUpdate(req.params.id, req.body);
  res
    .status(StatusCodes.OK)
    .json({ msg: "product updated", Products: updatedProd });
};

export const replenishProduct = async (req, res) => {
  var prodQty = req.body.prodQty;
  var replenishQty = req.body.prodReplenishQty;
  var updatedProdQty = parseInt(prodQty) + parseInt(replenishQty);
  req.body.prodQty = updatedProdQty;

  const replenishedProd = await Products.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: "product updated", Products: replenishedProd });
};

export const deleteProduct = async (req, res) => {
  const deleteProd = await Products.findByIdAndUpdate(req.params.id, {
    prodIsDel: 1,
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "product deleted", prod: deleteProd });
};

export const createProductImgs = async (req, res) => {
  // console.log(1, req.body);
  var prodImgs = { ...req.body };
  const prodType = "Products";
  const prodCat = prodImgs.category.replace(/\s/, "_");
  var ctr = 0;
  if (req.files) {
    for (const file of req.files) {
      const response = await cloudinary.v2.uploader.upload(file.path, {
        folder: prodType + "/" + prodCat,
      });
      await fs.unlink(file.path);
      file.prodImgProdID = prodImgs.imgID;
      file.prodImgUrl = response.secure_url;
      file.prodImgPublicID = response.public_id;
    }
    prodImgs = await Products_Images.insertMany(req.files);
    res.status(StatusCodes.CREATED).json({ prodImgs });
  }
};

export const getProductImgs = async (req, res) => {
  const prodImgs = await Products_Images.find({ prodImgProdID: req.params.id });
  res.status(StatusCodes.OK).json({ prodImgs });
};
// END PRODUCTS

// USERS
export const getAllUsers = async (req, res) => {
  try {
    // 1. Extract query params
    const {
      page = 1,
      limit = 15,
      sortBy = "userUsername",
      sortOrder = "asc",
      category,
      search,
    } = req.query;

    const query = {};

    // FILTER NOT DELETED
    query.userIsDel = 0;

    // 2. Optional search filter
    if (search) {
      query.$or = [
        { userUsername: { $regex: search, $options: "i" } },
        { userEmail: { $regex: search, $options: "i" } },
      ];
    }

    // 3. Optional category filter
    if (category) {
      query.userUserType = category;
    }

    // 4. Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // 5. Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // 6. Get products with pagination and sorting
    const usersData = await Users.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // 7. Get total count for pagination info
    const totalUsers = await Users.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / Number(limit));

    // 9. Return the result
    res.status(StatusCodes.OK).json({
      users: usersData,
      currentPage: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong." });
  }
};

export const getUser = async (req, res) => {
  const userData = await Users.findById(req.params.id);
  res.status(StatusCodes.OK).json({ userData });
};

export const getCurrentUser = async (req, res) => {
  const user = await Users.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const createUser = async (req, res) => {
  const isFirstAccount = (await Users.countDocuments()) === 0;
  req.body.userType = isFirstAccount ? "Super Admin" : req.body.useUserType;

  const hashedPassword = await hashPassword(req.body.userPassword);
  req.body.userPassword = hashedPassword;

  const user = await Users.create(req.body);

  const obj = Object();
  obj.userUserID = user._id;
  // console.log(obj);
  const userInfo = await UserInfo.create(obj);
  res.status(StatusCodes.CREATED).json({ user });
};

export const updateUser = async (req, res) => {
  //check if front-end/back-end
  const obj = { ...req.body };

  // this is for back-end
  const updatedUser = await Users.findByIdAndUpdate(req.params.id, obj);
  res.status(StatusCodes.OK).json({ msg: "user updated", Users: updatedUser });
};

export const deleteUser = async (req, res) => {
  const deleteUser = await Users.findByIdAndUpdate(req.params.id, {
    userIsDel: 1,
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "user deleted", user: deleteUser });
};

export const changePassword = async (req, res) => {
  //check if front-end/back-end

  // this is for back-end
  const updatedPassUser = await Users.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "user password changed", job: updatedPassUser });
};
// END USERS

// RECIPES
export const getAllRecipes = async (req, res) => {
  try {
    // 1. Extract query params
    const {
      page = 1,
      limit = 10,
      sortBy = "recipeName",
      sortOrder = "asc",
      category,
      search,
    } = req.query;

    const query = {};

    // FILTER NOT DELETED
    query.recipeIsDel = 0;

    // 2. Optional search filter
    if (search) {
      query.$or = [
        { recipeName: { $regex: search, $options: "i" } },
        { recipeAuthor: { $regex: search, $options: "i" } },
      ];
    }

    // 3. Optional category filter
    if (category) {
      query.recipeCat = category;
    }

    // 4. Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // 5. Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // 6. Get products with pagination and sorting
    const recipesData = await Recipes.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // 7. Get total count for pagination info
    const totalRecipes = await Recipes.countDocuments(query);
    const totalPages = Math.ceil(totalRecipes / Number(limit));

    // 9. Return the result
    res.status(StatusCodes.OK).json({
      recipes: recipesData,
      currentPage: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong." });
  }
};

export const createRecipe = async (req, res) => {
  const recipe = await Recipes.create(req.body);
  res.status(StatusCodes.CREATED).json({ recipe });
};

export const getRecipe = async (req, res) => {
  const recipeData = await Recipes.findById(req.params.id);
  res.status(StatusCodes.OK).json({ recipeData });
};

export const updateRecipe = async (req, res) => {
  const updatedRecipe = await Recipes.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: "recipe updated", Recipe: updatedRecipe });
};

export const deleteRecipe = async (req, res) => {
  const deleteRecipe = await Recipes.findByIdAndUpdate(req.params.id, {
    recipeIsDel: 1,
    new: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "recipe deleted", Recipe: deleteRecipe });
};
// END RECIPES

// ARCHIVES
export const getAllArchiveBrands = async (req, res) => {
  try {
    // 1. Extract query params
    const {
      page = 1,
      limit = 10,
      sortBy = "brandName",
      sortOrder = "asc",
      category,
      search,
    } = req.query;

    const query = {};

    // FILTER NOT DELETED
    query.brandIsDel = 1;

    // 2. Optional search filter
    if (search) {
      query.brandName = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // 3. Optional category filter
    if (category) {
      query.brandCat = category;
    }

    // 4. Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // 5. Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // 6. Get products with pagination and sorting
    const brandsData = await Brands.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // 7. Get total count for pagination info
    const totalBrands = await Brands.countDocuments(query);
    const totalPages = Math.ceil(totalBrands / Number(limit));

    // 9. Return the result
    res.status(StatusCodes.OK).json({
      brands: brandsData,
      currentPage: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong." });
  }
};

export const restoreArchiveBrand = async (req, res) => {
  const restoredBrand = await Brands.findByIdAndUpdate(req.params.id, {
    brandIsDel: 0,
    new: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "brand restored", band: restoredBrand });
};

export const deleteArchiveBrand = async (req, res) => {
  const deleteBrand = await Brands.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "brand deleted permanently", brand: deleteBrand });
};

export const getAllArchiveProducts = async (req, res) => {
  try {
    // 1. Extract query params
    const {
      page = 1,
      limit = 10,
      sortBy = "prodName",
      sortOrder = "asc",
      category,
      search,
    } = req.query;

    const query = {};

    // FILTER NOT DELETED
    query.prodIsDel = 1;

    // 2. Optional search filter

    if (search) {
      query.prodName = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // 3. Optional category filter
    if (category) {
      query.prodCat = category;
    }

    // 4. Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // 5. Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // 6. Get products with pagination and sorting
    const prodsData = await Products.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // 7. Get total count for pagination info
    const totalProducts = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / Number(limit));

    // 9. Return the result
    res.status(StatusCodes.OK).json({
      products: prodsData,
      currentPage: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong." });
  }
};

export const restoreArchiveProduct = async (req, res) => {
  const restoredProduct = await Products.findByIdAndUpdate(req.params.id, {
    prodIsDel: 0,
    new: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "product restored", prod: restoredProduct });
};

export const deleteArchiveProduct = async (req, res) => {
  const deleteProduct = await Products.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "product deleted permanently", prod: deleteProduct });
};

export const getAllArchiveRecipes = async (req, res) => {
  try {
    // 1. Extract query params
    const {
      page = 1,
      limit = 10,
      sortBy = "recipeName",
      sortOrder = "asc",
      category,
      search,
    } = req.query;

    const query = {};

    // FILTER NOT DELETED
    query.recipeIsDel = 1;

    // 2. Optional search filter

    if (search) {
      query.recipeName = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // 3. Optional category filter
    if (category) {
      query.recipeCat = category;
    }

    // 4. Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // 5. Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // 6. Get products with pagination and sorting
    const recipesData = await Recipes.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // 7. Get total count for pagination info
    const totalRecipes = await Recipes.countDocuments(query);
    const totalPages = Math.ceil(totalRecipes / Number(limit));

    // 9. Return the result
    res.status(StatusCodes.OK).json({
      recipes: recipesData,
      currentPage: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong." });
  }
};

export const restoreArchiveRecipe = async (req, res) => {
  const restoredRecipe = await Recipes.findByIdAndUpdate(req.params.id, {
    recipeIsDel: 0,
    new: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Recipe restored", recipe: restoredRecipe });
};

export const deleteArchiveRecipe = async (req, res) => {
  const deleteRecipe = await Recipes.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "recipe deleted permanently", recipe: deleteRecipe });
};

export const getAllArchiveUsers = async (req, res) => {
  try {
    // 1. Extract query params
    const {
      page = 1,
      limit = 10,
      sortBy = "userUserame",
      sortOrder = "asc",
      category,
      search,
    } = req.query;

    const query = {};

    // FILTER NOT DELETED
    query.userIsDel = 1;

    // 2. Optional search filter
    if (search) {
      query.$or = [
        { userUsername: { $regex: search, $options: "i" } },
        { userEmail: { $regex: search, $options: "i" } },
      ];
    }

    // 3. Optional category filter
    if (category) {
      query.userUserType = category;
    }

    // 4. Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // 5. Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // 6. Get products with pagination and sorting
    const usersData = await Users.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // 7. Get total count for pagination info
    const totalUsers = await Users.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / Number(limit));

    // 9. Return the result
    res.status(StatusCodes.OK).json({
      users: usersData,
      currentPage: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong." });
  }
};

export const restoreArchiveUser = async (req, res) => {
  const restoredUser = await Users.findByIdAndUpdate(req.params.id, {
    userIsDel: 0,
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "User restored", user: restoredUser });
};

export const deleteArchiveUser = async (req, res) => {
  const deleteUser = await Users.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "User deleted permanently", prod: deleteUser });
};
// END ARCHIVES
