import { addItemToCart , getUserCart,removeItemFromCart } from "../services/cart.service.js";
import { calculateCheckout } from "../services/pricing.service.js";
import ApiResponse from "../utils/ApiResponce.js";

export const addItem = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log(req.headers);
console.log(req.headers["x-user-id"]);
    const cart = await addItemToCart({userId, ...req.body});
    

    res.status(200).json(
      new ApiResponse(
        200,
        cart,
        "Item added successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const checkout = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"];

    const cart = await getUserCart(userId);

    const summary = calculateCheckout(cart);

    return res.status(200).json(
      new ApiResponse(
        200,
        summary,
        "Checkout calculated successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"];
    const { productId } = req.params;

    const cart = await removeItemFromCart(userId, productId);

    return res.status(200).json(
      new ApiResponse(
        200,
        cart,
        "Item removed successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};