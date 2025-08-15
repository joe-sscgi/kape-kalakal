import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema(
  {
    userUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      alias: "userID",
      required: true,
    },
    userLastName: {
      type: String,
      alias: "lastName",
      required: true,
    },
    userFirstName: {
      type: String,
      alias: "firstName",
      required: true,
    },
    userMiddleName: {
      type: String,
      alias: "middleName",
    },
    userAddressNoStBrgy: {
      type: String,
      alias: "noStBrgy",
      required: true,
    },
    userAddressCityMunicipality: {
      type: String,
      alias: "cityMunicipality",
      required: true,
    },
    userProvince: {
      type: String,
      alias: "province",
      required: true,
    },
    userPostalCode: {
      type: String,
      alias: "postal",
    },
    userLandmark: {
      type: String,
      alias: "landmark",
    },
    userInfoIsDel: {
      type: Boolean,
      alias: "isDel",
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserInfo", UserInfoSchema);
