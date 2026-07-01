import express from "express";

import { addItem,checkout,removeItem } from "../controllers/cart.controller.js";

import validate from "../middlewares/validate.middleware.js";

import { addItemSchema } from "../validators/cart.validator.js";

const router = express.Router();

router.post(
  "/items",
  validate(addItemSchema),
  addItem
);
router.get("/checkout", checkout);
router.delete("/items/:productId", removeItem);

export default router;