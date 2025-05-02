import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../error/errorCodes.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, userType } = verifyJWT(token);
    req.user = { userId, userType };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const levelOfAccess = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, userType } = verifyJWT(token);
    req.user = { userId, userType };

    if (req.user.userType != "super admin" || req.user.userType != "admin") {
      throw new UnauthorizedError("Unauthorized access");
    }
    // console.log(req.user.userType);

    next();
  } catch (error) {
    throw new UnauthorizedError("Unauthorized access");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized access");
    }
    next();
  };
};
