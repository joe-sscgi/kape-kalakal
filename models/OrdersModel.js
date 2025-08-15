import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    cartID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["PayPal"],
      default: "PayPal",
    },
    currency: {
      type: String,
      default: "PHP",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Expired"],
      default: "Pending",
      index: true,
    },
    // ref invoice date
    paymentDate: {
      type: Date,
      default: null,
    },
    cancelledDate: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      index: { expireAfterSeconds: 0 },
      default: null,
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
      index: true,
    },
    shippedDate: {
      type: Date,
      default: null,
    },
    deliveredDate: {
      type: Date,
      default: null,
    },
    billingDetails: {
      customerName: {
        type: String,
        required: true,
      },
      addressNoStBrgy: {
        type: String,
        required: true,
      },
      addressCityMunicipality: {
        type: String,
        required: true,
      },
      addressProvince: {
        type: String,
        required: true,
      },
      addressLandmark: {
        type: String,
        default: "",
      },
      postalCode: {
        type: String,
        default: "00000", // default for PayPal
      },
      contact: {
        type: String,
        default: "",
      },
    },
    // Optionally add transaction details from payment provider
    paymentTransactionID: {
      type: String,
      default: null,
    },
    paymentProviderResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

OrdersSchema.methods.generateOrderID = function () {
  const now = new Date();
  const yyyy = now.getFullYear().toString();
  const mm = (now.getMonth() + 1).toString().padStart(2, "0");
  const dd = now.getDate().toString().padStart(2, "0");
  const datePart = `${yyyy}${mm}${dd}`; // YYYYMMDD

  const randomPart = Math.random().toString(36).substring(2, 13).toUpperCase(); // 11 chars

  return `ORD-${datePart}-${randomPart}`;
};

export default mongoose.model("Orders", OrdersSchema);
