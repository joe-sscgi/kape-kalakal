import { StatusCodes } from "http-status-codes";

import Users from "../models/UsersModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../error/errorCodes.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstAccount = (await Users.countDocuments()) === 0;
  req.body.userType = isFirstAccount ? "super admin" : "customer";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await Users.create(req.body);
  // res.status(StatusCodes.CREATED).json({ user });
  // res.status(StatusCodes.CREATED).json(req.body.userType + "Created");
  res.status(StatusCodes.CREATED).json("User Registration Success!");
};

export const login = async (req, res) => {
  const userData = await Users.findOne({ userUsername: req.body.userUsername });

  // const userData = await Users.findOne(
  //   Users.translateAliases({ username: req.body.username })
  // );

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
