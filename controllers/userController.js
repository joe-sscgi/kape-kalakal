import { StatusCodes } from "http-status-codes";

import Users from "../models/UsersModel.js";
import UserInfo from "../models/UserInfoModel.js";
import { hashPassword } from "../utils/passwordUtils.js";

// USERS
export const getAllUsers = async (req, res) => {
  // console.log(req);

  const usersData = await Users.find({});
  res.status(StatusCodes.OK).json({ usersData });
};

export const getUser = async (req, res) => {
  const userData = await Users.findById(req.params.id);
  res.status(StatusCodes.OK).json({ userData });
};

export const getCurrentUser = async (req, res) => {
  const user = await Users.findOne({ _id: req.user.userId }).aggregate([
    {
      $lookup: {
        from: UserInfo,
        localField: userUserID,
        foreignField: _id,
        as: "userInfoData",
      },
    },
  ]);
  const userWithoutPassword = user.toJSON();
  console.log(user);
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const createUser = async (req, res) => {
  const isFirstAccount = (await Users.countDocuments()) === 0;
  req.body.userType = isFirstAccount ? "super admin" : req.body.userType;

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await Users.create(req.body);

  const obj = Object();
  obj.userUserID = user._id;
  // console.log(obj);
  const userInfo = await UserInfo.create(obj);
  res.status(StatusCodes.CREATED).json({ user });
};

export const updateUser = async (req, res) => {
  //check if front-end/back-end

  const obj = { ...req.body };
  delete obj.password;

  // this is for back-end
  const updatedUser = await Users.findByIdAndUpdate(req.params.id, obj, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: "user updated", job: updatedUser });
};

export const deleteUser = async (req, res) => {
  const deleteUser = await Users.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "user deleted", user: deleteUser });
};

export const changePassword = async (req, res) => {
  //check if front-end/back-end

  // this is for back-end
  const updatedPassUser = await Users.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "user password changed", job: updatedPassUser });
};
// END USERS

export const updateUserProfile = async (req, res) => {
  const userInfo = { ...req.body };
  // const userInfo = user;
  // delete userInfo.userEmail;
  // delete userInfo.userUsername;
  // delete userInfo.userPassword;

  const updatedUser = await Users.findByIdAndUpdate(req.params.id, userInfo);

  const userInfoData = await UserInfo.find(req.params.id);
  if (userInfoData) {
    const updatedUserProfile = await UserInfo.findByIdAndUpdate(
      userInfoData._id,
      obj
    );
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "user profile updated", Users: updatedUser });
};
