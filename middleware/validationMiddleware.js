import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  NoChangesError,
} from "../error/errorCodes.js";
import mongoose from "mongoose";
import Users from "../models/UsersModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const firstMessage = errorMessages[0];
        console.log(Object.getPrototypeOf(firstMessage));
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body("userEmail")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (userEmail) => {
      const user = await Users.findOne({ userEmail });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("userUsername")
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 6 })
    .withMessage("username must be atleast 6 characters")
    .custom(async (userUsername) => {
      const user = await Users.findOne({ userUsername });
      if (user) {
        throw new BadRequestError("username already exists");
      }
    }),
  body("userPassword")
    .notEmpty()
    .withMessage("password is required")
    .isStrongPassword([
      {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      },
    ])
    // .withMessage(returnScore),
    // .returnScore()
    .withMessage(
      "weak password, password must be alteast 6 characters with 1 uppercase, 1 lower case, 1 number and 1 symbol"
    ),
  body("confirmPassword")
    .notEmpty()
    .withMessage("confirm password is required")
    .custom((value, { req }) => {
      return value === req.body.userPassword;
    })
    .withMessage("password does not match")
    .isStrongPassword([
      {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      },
    ])
    // .withMessage(returnScore)
    .withMessage(
      "weak password, password must be alteast 6 characters with 1 uppercase, 1 lower case, 1 number and 1 symbol"
    ),
]);

export const validateLoginInput = withValidationErrors([
  body("userUsername").notEmpty().withMessage("username is required"),
  body("userPassword").notEmpty().withMessage("password is required"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError("invalid MongoDB id");
    const user = await Users.findById(value);
    if (!user) throw new NotFoundError(`no user with id ${value}`);
    // console.log(user.userType);
    const isSuperAdmin = req.user.userType === "Super Admin";

    if (!isSuperAdmin) throw new UnauthorizedError("Unathorized Access!");
  }),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("userEmail")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (userEmail, { req }) => {
      const userEmailCheck = await Users.findOne({ userEmail });
      if (userEmailCheck) {
        if (userEmailCheck._id.toString() !== req.body.userID) {
          throw new BadRequestError("email already exists");
        }
      }
    }),
  body("userUsername")
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 6 })
    .withMessage("username must be atleast 6 characters")
    .custom(async (userUsername, { req }) => {
      const userNameCheck = await Users.findOne({ userUsername });
      if (userNameCheck) {
        if (userNameCheck._id.toString() !== req.body.userID) {
          throw new BadRequestError("username already exists");
        }
      }
      const userID = req.body.userID;
      const user = await Users.findById(userID);
      if (user) {
        if (userUsername == user.userUsername) {
          throw new NoChangesError("Username did not Change!");
        }
      }
    }),
]);
