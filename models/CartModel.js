import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
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

export default mongoose.model("Cart", CartSchema);
