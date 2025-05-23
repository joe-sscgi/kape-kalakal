import mongoose from "mongoose";
import { BRAND_CAT } from "../utils/contants.js";

const BrandsSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      alias: "name",
    },
    brandDesc: {
      type: String,
      alias: "description",
    },
    brandCat: {
      type: String,
      alias: "category",
      enum: Object.values(BRAND_CAT),
      default: "Kurasu Originals",
    },
    brandImg: {
      type: String,
      alias: "image",
    },
    brandIsFeatured: {
      type: Boolean,
      alias: "isFeatured",
    },
    brandIsDel: {
      type: Boolean,
      alias: "isDel",
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Brands", BrandsSchema);
