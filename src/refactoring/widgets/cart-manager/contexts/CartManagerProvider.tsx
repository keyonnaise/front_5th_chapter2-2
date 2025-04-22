import { useMemo } from "react";
import { Coupon } from "../../../entities/coupon/model";
import { Product } from "../../../entities/product/model";
import { CartItem } from "../../../entities/cart/model";
import { useCart } from "../../../entities/cart/hooks";
import { createSafeContext } from "../../../shared/lib/createSafeContext";

interface Props {
  children: React.ReactNode;
}

export const CartManagerProvider = ({ children }: Props) => {
  const {
    cart,
    selectedCoupon,
    addToCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    calculateTotal,
  } = useCart();

  const actions = useMemo(
    () => ({
      addToCart,
      updateQuantity,
      removeFromCart,
      applyCoupon,
      calculateTotal,
    }),
    [addToCart]
  );

  return (
    <CartManagerStateProvider cart={cart} selectedCoupon={selectedCoupon}>
      <CartManagerActionsProvider {...actions}>{children}</CartManagerActionsProvider>
    </CartManagerStateProvider>
  );
};

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

export const [CartManagerStateProvider, useCartManagerStateContext] =
  createSafeContext<ContextState>("CartManagerProvider");
export const [CartManagerActionsProvider, useCartManagerActionsContext] =
  createSafeContext<ContextActions>("CartManagerProvider");
