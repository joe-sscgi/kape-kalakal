import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    items: [
      {
        prodID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        prodName: { type: String, required: true },
        prodImgUrl: { type: String },
        prodQty: { type: Number, default: 1, min: 1 },
        prodPrice: { type: Number, required: true, min: 0 },
      },
    ],
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
