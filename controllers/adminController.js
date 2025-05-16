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

// BRANDS
export const getAllBrands = async (req, res) => {
  const brandsData = await Brands.find({});
  res.status(StatusCodes.OK).json({ brandsData });
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
  const deleteBrand = await Brands.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "brand deleted", prod: deleteBrand });
};
// END BRANDS

// PRODUCTS
export const getAllProducts = async (req, res) => {
  const productsData = await Products.find({});
  res.status(StatusCodes.OK).json({ productsData });
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

export const deleteProduct = async (req, res) => {
  const deleteProd = await Products.findByIdAndDelete(req.params.id);
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
  const usersData = await Users.find({});
  res.status(StatusCodes.OK).json({ usersData });
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

  // const hashedPassword = await hashPassword(req.body.userPassword);
  // req.body.userPassword = hashedPassword;

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
  const deleteUser = await Users.findByIdAndDelete(req.params.id);
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
  const recipesData = await Recipes.find({});
  res.status(StatusCodes.OK).json({ recipesData });
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
  const deleteRecipe = await Recipes.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "recipe deleted", Recipe: deleteRecipe });
};
// END RECIPES
