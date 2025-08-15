import mongoose from "mongoose";

const TmpCartSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    prodID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    prodName: {
      type: String,
      required: true, // good to have since snapshot data is important
    },
    prodImgUrl: {
      type: String,
    },
    prodQty: {
      type: Number,
      default: 1, // typically default quantity is 1
      min: 1,
    },
    prodPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TempCart", TmpCartSchema);
