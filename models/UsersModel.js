import mongoose from "mongoose";
// import { USER_TYPE } from "../utils/contants.js";

const UsersSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      alias: "email",
      unique: true,
      required: true,
      lowercase: true,
    },
    userUsername: {
      type: String,
      alias: "username",
      unique: true,
      required: true,
    },
    userPassword: {
      type: String,
      alias: "password",
      required: true,
    },
    userUserType: {
      type: String,
      alias: "userType",
      enum: ["Super Admin", "Admin", "Customer"],
      default: "Customer",
    },
    userIsDel: {
      type: Boolean,
      alias: "isDel",
      default: false,
    },
  },
  { timestamps: true }
);

UsersSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.userPassword;
  delete obj.updatedAt;
  delete obj.createdAt;
  return obj;
};

export default mongoose.model("Users", UsersSchema);
