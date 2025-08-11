import { StatusCodes } from "http-status-codes";

import Users from "../models/UsersModel.js";
import UserInfo from "../models/UserInfoModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../error/errorCodes.js";
import { createJWT, verifyJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstAccount = (await Users.countDocuments()) === 0;
  req.body.userUserType = isFirstAccount ? "Super Admin" : "Customer";

  const hashedPassword = await hashPassword(req.body.userPassword);
  req.body.userPassword = hashedPassword;
  // req.body.userIsDel = 0;
  // console.log(req.body);

  const user = await Users.create(req.body);
  const obj = Object();
  obj.userUserID = user._id;
  // console.log(obj);
  const userInfo = await UserInfo.create(obj);
  // res.status(StatusCodes.CREATED).json({ user });
  // res.status(StatusCodes.CREATED).json(req.body.userType + "Created");
  res.status(StatusCodes.CREATED).json("User Registration Success!");
};

export const login = async (req, res) => {
  const userData = await Users.findOne({ userUsername: req.body.userUsername });
  console.log(userData);
  if (!userData) {
    throw new UnauthenticatedError("User Not Found");
  } else {
    const pass = await comparePassword(
      req.body.userPassword,
      userData.userPassword
    );

    if (!pass) throw new UnauthenticatedError("Incorrect password");
  }

  const token = createJWT({
    userId: userData._id,
    userType: userData.userUserType,
  });

  console.log(1, token);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "user logged in", userData });

  // res.status(StatusCodes.OK).json({ userData });
};

export const logout = (req, res) => {
  // console.log("controler");
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export const getCurrentUser = async (req, res) => {
  try {
    // 1. Get token from cookies (or Authorization header if that's what you use)
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(StatusCodes.OK).json({ user: null });
    }

    // 2. Decode the token
    const decoded = verifyJWT(token);
    req.user = { userId: decoded.userId }; // <-- now req.user exists

    // 3. Find the user
    const user = await Users.findOne({ _id: req.user.userId }).select(
      "-password"
    );
    if (!user) {
      return res.status(StatusCodes.OK).json({ user: null });
    }

    // 4. Send response
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    // If token invalid or expired, just return no user
    return res.status(StatusCodes.OK).json({ user: null });
  }
};
