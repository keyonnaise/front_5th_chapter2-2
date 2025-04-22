import { useState } from "react";
import { usePreservedCallback } from "../../../shared/hooks";
import { Coupon } from "../../coupon/model";
import { Product } from "../../product/model";
import { CartItem, calculateCartTotal, updateCartItemQuantity } from "../model";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = usePreservedCallback((product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
      return;
    }

    setCart((prev) => [...prev, { product, quantity: 1 }]);
  });

  const removeFromCart = usePreservedCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  });

  const updateQuantity = usePreservedCallback((productId: string, quantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, quantity));
  });

  const applyCoupon = usePreservedCallback((coupon: Coupon) => {
    setSelectedCoupon(coupon);
  });

  const calculateTotal = usePreservedCallback(() => {
    return calculateCartTotal(cart, selectedCoupon);
  });

  return {
    cart,
    selectedCoupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
  };
};
