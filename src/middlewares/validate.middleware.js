import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
       headers: req.headers,
    });

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return next(new ApiError(400, error.issues[0].message));
    }

    next(error);
  }
};

export default validate;