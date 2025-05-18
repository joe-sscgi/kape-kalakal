import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";

import Brands from "../models/BrandsModel.js";
import Products from "../models/ProductsModel.js";
import Products_Images from "../models/ProductImgsModel.js";
import Recipes from "../models/RecipesModel.js";

export const getLandingData = async (req, res) => {
  const brandsData = await Brands.find({});
  const productsData = await Products.find({ prodIsBest: "1" });
  //   const prodImgs = await Products_Images.find({ prodImgProdID: req.params.id });
  const recipesData = await Recipes.find({});

  //   const allData = ["brands" : brandsData, productsData, recipesData];
  const allData = {};
  allData.brands = brandsData;
  allData.prods = productsData;
  allData.recipes = recipesData;

  res.status(StatusCodes.OK).json({ allData });
};
