import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";

import Brands from "../models/BrandsModel.js";
import Products from "../models/ProductsModel.js";
import Products_Images from "../models/ProductImgsModel.js";

export const getLandingData = async (req, res) => {
  const brandsData = await Brands.find({ brandIsFeatured: 1 });
  const productsData = await Products.find({ prodIsBest: "1" });
  const prodImgsData = await Products_Images.find({});

  //   const allData = ["brands" : brandsData, productsData, recipesData];
  const allData = {};
  allData.brands = brandsData;
  allData.prods = productsData;
  allData.prodImgs = prodImgsData;

  res.status(StatusCodes.OK).json({ allData });
};
