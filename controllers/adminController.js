import { StatusCodes } from "http-status-codes";

import Brands from "../models/BrandsModel.js";
import Products from "../models/ProductsModel.js";
import Users from "../models/UsersModel.js";
import { hashPassword } from "../utils/passwordUtils.js";

// BRANDS
export const getAllBrands = async (req, res) => {
  const brandsData = await Brands.find({});
  res.status(StatusCodes.OK).json({ brandsData });
};

export const createBrand = async (req, res) => {
  const brand = await Brands.create(req.body);
  res.status(StatusCodes.CREATED).json({ brand });
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

  const hashedPassword = await hashPassword(req.body.userPassword);
  req.body.userPassword = hashedPassword;

  const user = await Users.create(req.body);
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
