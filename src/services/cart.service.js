import Cart from "../models/Cart.js";
import ApiError from "../utils/ApiError.js";

export const addItemToCart = async (itemData) => {
  const {
    userId,
    productId,
    name,
    price,
    quantity,
    category
  } = itemData;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: []
    });
  }

  const existingItem = cart.items.find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.price = price;
    existingItem.name = name;
    existingItem.category = category;
  } else {
    cart.items.push({
      productId,
      name,
      price,
      quantity,
      category
    });
  }

  await cart.save();

  return cart;
};


export const getUserCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  return cart;
};

export const removeItemFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const itemExists = cart.items.some(
    (item) => item.productId === productId
  );

  if (!itemExists) {
    throw new ApiError(404, "Item not found in cart");
  }

  cart.items = cart.items.filter(
    (item) => item.productId !== productId
  );

  // Refresh cart expiry
  cart.expiresAt = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  );

  await cart.save();

  return cart;
};