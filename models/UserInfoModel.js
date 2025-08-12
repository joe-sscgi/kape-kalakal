import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema(
  {
    userUserID: {
      type: String,
      alias: "userID",
    },
    userLastName: {
      type: String,
      alias: "lastName",
    },
    userFirstName: {
      type: String,
      alias: "firstName",
    },
    userMiddleName: {
      type: String,
      alias: "middleName",
    },
    userAddressNoStBrgy: {
      type: String,
      alias: "noStBrgy",
    },
    userAddressCityMunicipality: {
      type: String,
      alias: "cityMunicipality",
    },
    userProvince: {
      type: String,
      alias: "province",
    },
    userPostalCode: {
      type: Number,
      alias: "postal",
    },
    userLandmark: {
      type: String,
      alias: "postal",
    },
    userInfoIsDel: {
      type: Boolean,
      alias: "isDel",
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserInfo", UserInfoSchema);
