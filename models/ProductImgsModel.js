import mongoose from "mongoose";

const ProductsImgsSchema = new mongoose.Schema(
  {
    prodImgProdID: {
      type: String,
    },
    prodImgUrl: {
      type: String,
    },
    prodImgPublicID: {
      type: String,
    },
    prodImgIsDel: {
      type: Boolean,
      alias: "isDel",
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products_Images", ProductsImgsSchema);
