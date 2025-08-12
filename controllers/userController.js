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
import mongoose from "mongoose";

export const getHomepageData = async (req, res) => {
  // 1. Get user data
  const userData = (await Users.findOne({ _id: req.user.userId })) || null;

  // 2. Get featured brands
  const featBrandsData = await Brands.find({ brandIsFeatured: 1 });
  const safeFeatBrandsData =
    featBrandsData && featBrandsData.length > 0 ? featBrandsData : [];

  // 3. Get FOTM product
  const fotmProductData = await Products.findOne({ prodIsFotm: "1" });
  let fotmProdImgsData = [];
  let fotmProductsWithFirstImage = null;
  if (fotmProductData) {
    fotmProdImgsData =
      (await Products_Images.findOne({
        prodImgProdID: fotmProductData._id,
      })) || null;
    fotmProductsWithFirstImage = {
      ...fotmProductData.toObject(),
      prodImg: fotmProdImgsData,
    };
  }

  // 4. Get cart data
  const cartData = (await TempCart.find({ userID: req.user.userId })) || [];

  // 5. Get best products
  const bestProductsData = await Products.find({ prodIsBest: "1" });
  let bestProductsWithFirstImage = [];
  if (bestProductsData && bestProductsData.length > 0) {
    let bestProductIds = bestProductsData.map((p) => p._id);
    let imagesData = await Products_Images.find({
      prodImgProdID: { $in: bestProductIds },
    }).sort({ _id: 1 });

    const firstImageByProductId = {};
    for (const img of imagesData) {
      const key = img.prodImgProdID.toString();
      if (!firstImageByProductId[key]) {
        firstImageByProductId[key] = img;
      }
    }

    bestProductsWithFirstImage = bestProductsData.map((product) => ({
      ...product.toObject(),
      prodImg: firstImageByProductId[product._id.toString()] || null,
    }));
  }

  const homepageData = {
    userData,
    featBrandsData: safeFeatBrandsData,
    bestProductsData: bestProductsWithFirstImage,
    fotmProductData: fotmProductsWithFirstImage,
    cartData,
  };

  res.status(StatusCodes.OK).json({ homepageData });
};

export const getProduct = async (req, res) => {
  const id = req.params.id;

  const [productWithImages] = await Products.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "products_images",
        let: { prodIdStr: { $toString: "$_id" } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$prodImgProdID", "$$prodIdStr"],
              },
            },
          },
        ],
        as: "images",
      },
    },
    { $limit: 1 },
  ]);

  res.status(StatusCodes.OK).json({ product: productWithImages });
};

export const addToTmpCart = async (req, res) => {
  const checkCartItem = await TempCart.findOne({
    userID: req.user.userId,
    prodID: req.body.prodID,
  });

  const addToCartData = req.body;

  //CHECK PRODUCT IF EXISTING
  if (checkCartItem) {
    checkCartItem.prodQty += addToCartData.prodQty;
    const updatedCart = await TempCart.findByIdAndUpdate(
      checkCartItem._id,
      checkCartItem
    );
    res
      .status(StatusCodes.OK)
      .json({ msg: "Cart Itemm Updated Successfully", cart: updatedCart });
  } else {
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

export const checkingOut = async (req, res) => {
  // GET USER DETAILS SPECIALLY ADDRESS FOR SHIPPING DETAILS
  const userInfo = await UserInfo.findOne({ userUserID: req.user.userId });
  const userCart = await TempCart.find({ userID: req.user.userId });

  const checkoutDetails = {
    userInfo: userInfo,
    userCart: userCart,
  };

  res.status(StatusCodes.OK).json({ checkoutDetails: checkoutDetails });
};

export const checkout = async (req, res) => {
  // place order 1st, minus the cart item qty to product qty, order status is pending, payment status is pending
  const { shippingDetails } = req.body;
  const { userCart } = shippingDetails;
  console.log(shippingDetails);
  // const cart = await Cart.create(userCart);
  // res.status(StatusCodes.CREATED).json({ cart });
};

export const getAllBrandCat = async (req, res) => {
  try {
    const categories = await Brands.distinct("brandCat");
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to fetch categories" });
  }
};

export const getBrand = async (req, res) => {
  try {
    const categories = await Brands.distinct("brandCat");
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to fetch categories" });
  }
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
