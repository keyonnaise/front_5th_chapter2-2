import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const discountRate = getMaxApplicableDiscount(item);
  const totalBeforeDiscount = item.product.price * item.quantity;
  const totalAfterDiscount = totalBeforeDiscount * (1 - discountRate);
  return totalAfterDiscount;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const maxRate = item.product.discounts.reduce((maxRate, discount) => {
    return maxRate < discount.rate && discount.quantity <= item.quantity ? discount.rate : maxRate;
  }, 0);
  return maxRate;
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;
  let totalDiscount = 0;

  cart.forEach((item) => {
    totalBeforeDiscount += item.product.price * item.quantity;
    totalAfterDiscount += calculateItemTotal(item);
  });

  totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  // 선택된 쿠폰이 있다면 쿠폰을 적용합니다.
  if (selectedCoupon) {
    totalAfterDiscount = applyCoupon(totalAfterDiscount, selectedCoupon);
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  }

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  // 수량이 0으로 설정된 경우 항목을 제거
  if (newQuantity === 0) {
    return cart.filter((item) => item.product.id !== productId);
  }

  const updated = cart.map((item) => {
    return item.product.id === productId
      ? { ...item, quantity: Math.min(newQuantity, item.product.stock) }
      : item;
  });

  return updated;
};

const applyCoupon = (amount: number, coupon: Coupon) => {
  return coupon.discountType === "amount"
    ? amount - coupon.discountValue
    : amount - amount / coupon.discountValue;
};
