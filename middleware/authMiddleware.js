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

// export const levelOfAccess = (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) throw new UnauthenticatedError("authentication invalid");

//   try {
//     const { userId, userType } = verifyJWT(token);
//     req.user = { userId, userType };

//     if (
//       req.user.userUserType != "Super Admin" ||
//       req.user.userUserType != "Admin"
//     ) {
//       throw new UnauthorizedError("Unauthorized access");
//     }
//     // console.log(req.user.userType);

//     next();
//   } catch (error) {
//     throw new UnauthorizedError("Unauthorized access");
//   }
// };

export const levelOfAccess = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Authentication invalid");

  try {
    const { userId, userUserType } = verifyJWT(token); // make sure your token payload has this exact key
    req.user = { userId, userUserType };

    // Only allow Super Admin or Admin
    if (userUserType !== "Super Admin" && userUserType !== "Admin") {
      throw new UnauthorizedError("Unauthorized access");
    }

    next();
  } catch (error) {
    throw new UnauthorizedError("Unauthorized access");
  }
};
