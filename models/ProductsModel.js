import mongoose from "mongoose";
import { PROD_CAT } from "../utils/contants.js"; // fixed typo in filename

const ProductsSchema = new mongoose.Schema(
  {
    prodName: {
      type: String,
      alias: "name",
      required: true,
    },
    prodDesc: {
      type: String,
      alias: "description",
      default: "",
    },
    prodCat: {
      type: String,
      alias: "category",
      enum: Object.values(PROD_CAT),
      default: "Coffee",
      required: true,
    },
    prodPrice: {
      type: Number,
      alias: "price",
      default: 0,
      min: 0,
    },
    prodQty: {
      type: Number,
      alias: "quantity",
      default: 0,
      min: 0,
    },
    prodIsFotm: {
      type: Boolean,
      alias: "isfotm",
      default: false,
    },
    prodIsBest: {
      type: Boolean,
      alias: "isbest",
      default: false,
    },
    prodBrandID: {
      type: mongoose.Schema.Types.ObjectId,
      alias: "brandID",
      ref: "Brands",
    },
    prodIsDel: {
      type: Boolean,
      alias: "isDel",
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductsSchema);
