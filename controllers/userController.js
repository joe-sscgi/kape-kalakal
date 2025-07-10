import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";

import Users from "../models/UsersModel.js";
import UserInfo from "../models/UserInfoModel.js";
import Brands from "../models/BrandsModel.js";
import Products from "../models/ProductsModel.js";
import Products_Images from "../models/ProductImgsModel.js";
import Recipes from "../models/RecipesModel.js";
import TempCart from "../models/TmpCartModel.js";
import Cart from "../models/CartModel.js";
import Invoice from "../models/InvoiceModel.js";
import Orders from "../models/OrdersModel.js";

export const getHomepageData = async (req, res) => {
  const userData = await Users.findOne({ _id: req.user.userId });
  const featBrandsData = await Brands.find({ brandIsFeatured: 1 });

  const fotmProductData = await Products.findOne({ prodIsFotm: "1" });
  const fotmProdImgsData = await Products_Images.findOne({
    prodImgProdID: fotmProductData._id,
  });
  const fotmProductsWithFirstImage = {
    ...fotmProductData.toObject(),
    prodImg: fotmProdImgsData,
  };
  // console.log(fotmProductsWithFirstImage);
  const cartData = await TempCart.find({ userID: req.user.userId });

  const bestProductsData = await Products.find({ prodIsBest: "1" });
  // 8. Attach first image to each product
  const bestProductIds = bestProductsData.map((p) => p._id);
  const imagesData = await Products_Images.find({
    prodImgProdID: { $in: bestProductIds },
  }).sort({ _id: 1 });

  const firstImageByProductId = {};
  for (const img of imagesData) {
    const key = img.prodImgProdID.toString();
    if (!firstImageByProductId[key]) {
      firstImageByProductId[key] = img;
    }
  }

  const bestProductsWithFirstImage = bestProductsData.map((product) => ({
    ...product.toObject(),
    prodImg: firstImageByProductId[product._id.toString()] || null,
  }));

  const homepageData = {};
  homepageData.userData = userData;
  homepageData.featBrandsData = featBrandsData;
  homepageData.bestProductsData = bestProductsWithFirstImage;
  homepageData.fotmProductData = fotmProductsWithFirstImage;
  homepageData.cartData = cartData;

  // console.log(homepageData);

  res.status(StatusCodes.OK).json({ homepageData });
};

export const addToTmpCart = async (req, res) => {
  const checkCartItem = await TempCart.findOne({
    userID: req.user.userId,
    prodID: req.body.prodID,
  });

  //CHECK PRODUCT IF EXISTING
  if (checkCartItem) {
    checkCartItem.prodQty += 1;
    const updatedCart = await TempCart.findByIdAndUpdate(
      checkCartItem._id,
      checkCartItem
    );
    res
      .status(StatusCodes.OK)
      .json({ msg: "Cart Itemm Updated Successfully", cart: updatedCart });
  } else {
    console.log(2);
    const tmpCart = await TempCart.create(req.body);
    res.status(StatusCodes.CREATED).json({ tmpCart });
  }
};

export const getTmpCart = async (req, res) => {
  const userCart = await TempCart.find({ userID: req.user.userId });
  res.status(StatusCodes.OK).json({ cart: userCart });
};

export const updateItemInCart = async (req, res) => {
  // console.log(req.body);
  const updatedCartItem = await TempCart.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "Cart Itemm Updated Successfully", cart: updatedCartItem });
};

export const delItemInCart = async (req, res) => {
  // console.log(req.params.id);
  const delTmpCartItem = await TempCart.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "cart item deleted", cartItem: delTmpCartItem });
};

export const checkout = async (req, res) => {
  const cart = await Cart.create(req.body);
  res.status(StatusCodes.CREATED).json({ cart });
};

// RECIPES
export const getAllRecipeType = async (req, res) => {
  // console.log(3, req.params);
  let type = "";
  if (req.params.type == "coffee") {
    type = "Coffee";
  } else if (req.params.type == "non-coffee") {
    type = "Non-Coffee";
  } else if (req.params.type == "pastry") {
    type = "Kashi Pastry";
  }

  const recipe = await Recipes.find({ recipeCat: type });

  res.status(StatusCodes.OK).json({ recipe: recipe });
};

export const getRecipe = async (req, res) => {
  const recipe = await Recipes.findOne({ _id: req.params.id });
  res.status(StatusCodes.OK).json({ recipe: recipe });
};

// USER
export const getCurrentUser = async (req, res) => {
  const user = await Users.findOne({ _id: req.user.userId });
  const userInfo = await UserInfo.findOne({ userUserID: req.user.userId });
  const userWithoutPassword = user.toJSON();
  userWithoutPassword.userInfo = userInfo;
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
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

export const updateUserProfile = async (req, res) => {
  const userInfo = { ...req.body };
  // const userInfo = user;
  // delete userInfo.userEmail;
  // delete userInfo.userUsername;
  // delete userInfo.userPassword;

  const updatedUser = await Users.findByIdAndUpdate(req.params.id, userInfo);

  const userInfoData = await UserInfo.find(req.params.id);
  if (userInfoData) {
    const updatedUserProfile = await UserInfo.findByIdAndUpdate(
      userInfoData._id,
      obj
    );
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "user profile updated", Users: updatedUser });
};
