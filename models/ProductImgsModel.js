import mongoose from "mongoose";

const ProductsImgsSchema = new mongoose.Schema(
  {
    prodImgProdID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    prodImgUrl: {
      type: String,
      required: true,
    },
    prodImgPublicID: {
      type: String,
    },
    prodImgIsDel: {
      type: Boolean,
      alias: "isDel",
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products_Images", ProductsImgsSchema);
