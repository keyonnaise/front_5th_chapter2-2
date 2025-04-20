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
  const result = cart.reduce(
    (result, item) => {
      const totalBeforeDiscount = result.totalBeforeDiscount + item.product.price * item.quantity;
      const totalAfterDiscount = result.totalAfterDiscount + calculateItemTotal(item);
      const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

      return {
        totalBeforeDiscount,
        totalAfterDiscount,
        totalDiscount,
      };
    },
    {
      totalBeforeDiscount: 0,
      totalAfterDiscount: 0,
      totalDiscount: 0,
    }
  );

  // 선택된 쿠폰이 있다면 쿠폰을 적용합니다.
  if (selectedCoupon !== null) {
    const appliedCoupon = applyCoupon(result.totalAfterDiscount, selectedCoupon);
    const totalDiscount = result.totalBeforeDiscount - appliedCoupon;

    return {
      ...result,
      totalDiscount,
      totalAfterDiscount: appliedCoupon,
    };
  }

  return result;
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
