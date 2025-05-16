import mongoose from "mongoose";
// import { USER_TYPE } from "../utils/contants.js";

const UsersSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      alias: "email",
    },
    userUsername: {
      type: String,
      alias: "username",
    },
    userPassword: {
      type: String,
      alias: "password",
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
      default: 0,
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
