import { useMemo } from "react";
import { createSafeContext } from "../../../shared/lib";
import { Coupon } from "../../coupon/model";
import { Product } from "../../product/model";
import { useCart } from "../hooks";
import { CartItem } from "../model";

interface Props {
  children: React.ReactNode;
}

function CartProvider({ children }: Props) {
  const {
    cart,
    selectedCoupon,
    addToCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    calculateTotal,
  } = useCart();

  const value = useMemo(
    () => ({
      cart,
      selectedCoupon,
    }),
    [cart, selectedCoupon],
  );

  const actions = useMemo(
    () => ({
      addToCart,
      updateQuantity,
      removeFromCart,
      applyCoupon,
      calculateTotal,
    }),
    [addToCart, updateQuantity, removeFromCart, applyCoupon, calculateTotal],
  );

  return (
    <CartStateProvider {...value}>
      <CartActionsProvider {...actions}>{children}</CartActionsProvider>
    </CartStateProvider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Context API
 * -----------------------------------------------------------------------------------------------*/

interface ContextState {
  cart: CartItem[];
  selectedCoupon: Coupon | null;
}

interface ContextActions {
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  applyCoupon: (coupon: Coupon) => void;
  calculateTotal: () => void;
}

export const [CartStateProvider, useCartStateContext] =
  createSafeContext<ContextState>("CartProvider");
export const [CartActionsProvider, useCartActionsContext] =
  createSafeContext<ContextActions>("CartProvider");

export default CartProvider;
