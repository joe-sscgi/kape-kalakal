import mongoose from "mongoose";

const TmpCartSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
    },
    prodID: {
      type: String,
    },
    prodName: {
      type: String,
    },
    prodImgUrl: {
      type: String,
    },
    prodQty: {
      type: Number,
      default: 0,
    },
    prodPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TempCart", TmpCartSchema);
