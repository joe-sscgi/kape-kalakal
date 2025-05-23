import mongoose from "mongoose";

const TmpCartSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
    },
    prodID: {
      type: String,
      alias: "name",
    },
    prodQty: {
      type: Number,
      alias: "quantity",
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TempCart", TmpCartSchema);
