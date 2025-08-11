import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    invoiceID: {
      type: String,
      required: true,
      unique: true,
    },
    orderID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", InvoiceSchema);
