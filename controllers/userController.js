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
  const bestProductsData = await Products.find({ prodIsBest: "1" });
  const prodImgsData = await Products_Images.find({});

  const homepageData = {};
  homepageData.userData = userData;
  homepageData.featBrandsData = featBrandsData;
  homepageData.bestProductsData = bestProductsData;
  homepageData.fotmProductData = fotmProductData;
  homepageData.prodImgs = prodImgsData;

  // console.log(homepageData);

  res.status(StatusCodes.OK).json({ homepageData });
};

export const addToTmpCart = async (req, res) => {
  const tmpCart = await TempCart.create(req.body);
  res.status(StatusCodes.CREATED).json({ tmpCart });
};

export const delItemInCart = async (req, res) => {
  const delTmpCartItem = await TempCart.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "cart item deleted", cartItem: delTmpCartItem });
};

export const checkout = async (req, res) => {
  const cart = await Cart.create(req.body);
  res.status(StatusCodes.CREATED).json({ cart });
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
