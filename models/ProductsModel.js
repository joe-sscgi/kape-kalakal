import mongoose from "mongoose";
import { PROD_CAT } from "../utils/contants.js";

const ProductsSchema = new mongoose.Schema(
  {
    prodName: {
      type: String,
      alias: "name",
    },
    prodDesc: {
      type: String,
      alias: "description",
    },
    prodCat: {
      type: String,
      alias: "category",
      enum: Object.values(PROD_CAT),
      default: "Coffee",
    },
    prodPrice: {
      type: Number,
      alias: "price",
    },
    prodImg: {
      type: String,
      alias: "image",
    },
    prodIsFotm: {
      type: Boolean,
      alias: "isfotm",
    },
    prodIsBest: {
      type: Boolean,
      alias: "isbest",
    },
    prodBrandID: {
      type: String,
      alias: "brandID",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductsSchema);
