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
      default: 0,
    },
    prodQty: {
      type: Number,
      alias: "quantity",
      default: 0,
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
    prodIsDel: {
      type: Boolean,
      alias: "isDel",
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductsSchema);
