import bcrypt from "bcryptjs";

export const hashPassword = async (userPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userPassword, salt);
  return hashedPassword;
};

export const comparePassword = async (userPassword, hashedPassword) => {
  // console.log(password);
  // console.log(hashedPassword);

  const isMatch = await bcrypt.compare(userPassword, hashedPassword);
  return isMatch;
};
