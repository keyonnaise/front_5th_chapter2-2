import { useState } from "react";
import { Coupon } from "../../coupon/model";
import { Product } from "../../product/model";
import { CartItem, calculateCartTotal, updateCartItemQuantity } from "../model";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
      return;
    }

    setCart((prev) => [...prev, { product, quantity: 1 }]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    calculateTotal,
    applyCoupon,
    selectedCoupon,
  };
};
