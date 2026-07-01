import { createUser } from "../services/user.service.js";
import ApiResponse from "../utils/ApiResponce.js";

export const createUserController = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    return res.status(201).json(
      new ApiResponse(201, user, "User created successfully")
    );
  } catch (error) {
    next(error);
  }
};