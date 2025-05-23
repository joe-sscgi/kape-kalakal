import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
    invoiceID: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Orders", OrdersSchema);
