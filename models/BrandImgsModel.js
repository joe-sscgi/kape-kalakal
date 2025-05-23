import mongoose from "mongoose";

const BrandsImgsSchema = new mongoose.Schema(
  {
    brandImgBrandID: {
      type: String,
    },
    brandImg: {
      type: String,
      alias: "img",
    },
    brandImgIsDel: {
      type: Boolean,
      alias: "isDel",
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Brands_Images", BrandsImgsSchema);
