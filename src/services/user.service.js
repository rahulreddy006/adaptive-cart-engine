import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const createUser = async ({ name, email }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    name,
    email,
  });

  return user;
};