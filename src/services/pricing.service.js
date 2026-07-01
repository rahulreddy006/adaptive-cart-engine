const PROMOTIONS = [
  {
    name: "Gold Discount",
    minSubtotal: 50000,
    discountPercentage: 20,
  },
  {
    name: "Silver Discount",
    minSubtotal: 10000,
    discountPercentage: 10,
  },
];

export const calculateCheckout = (cart) => {
  // Calculate subtotal
  const subtotal = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Count unique categories
  const uniqueCategories = new Set(
    cart.items.map((item) => item.category)
  );

  // Find best promotion
  let appliedPromotion = null;

  for (const promotion of PROMOTIONS) {
    if (subtotal >= promotion.minSubtotal) {
      appliedPromotion = promotion;
      break;
    }
  }

  let discount = 0;

  if (appliedPromotion) {
    discount =
      (subtotal * appliedPromotion.discountPercentage) / 100;
  }

  let categoryBonus = 0;

  if (uniqueCategories.size >= 3) {
    categoryBonus = 500;
  }

  const finalTotal = subtotal - discount - categoryBonus;

  return {
    items: cart.items,
    subtotal,
    discount,
    categoryBonus,
    total: finalTotal,
    promotion: appliedPromotion
      ? appliedPromotion.name
      : "No Promotion",
  };
};