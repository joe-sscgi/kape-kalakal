import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    cartID: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", InvoiceSchema);
