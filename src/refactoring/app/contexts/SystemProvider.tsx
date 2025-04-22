import { useMemo } from "react";
import { Coupon } from "../../entities/coupon/model";
import { Product } from "../../entities/product/model";
import { createSafeContext } from "../../shared/lib/createSafeContext";
import { useCoupons, useProducts } from "../hooks";

interface Props {
  products: Product[];
  coupons: Coupon[];
  children: React.ReactNode;
}

export const SystemProvider = ({
  products: initialProducts,
  coupons: initialCoupons,
  children,
}: Props) => {
  const { products, addProduct, modifyProduct } = useProducts(initialProducts);
  const { coupons, addCoupon } = useCoupons(initialCoupons);

  const actions = useMemo(
    () => ({
      addProduct,
      modifyProduct,
      addCoupon,
    }),
    []
  );

  return (
    <SystemStateProvider products={[...products]} coupons={[...coupons]}>
      <SystemActionsProvider {...actions}>{children}</SystemActionsProvider>
    </SystemStateProvider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Context API
 * -----------------------------------------------------------------------------------------------*/

interface ContextState {
  products: Product[];
  coupons: Coupon[];
}

interface ContextActions {
  addProduct: (product: Product) => void;
  modifyProduct: (product: Product) => void;
  addCoupon: (coupon: Coupon) => void;
}

export const [SystemStateProvider, useSystemStateContext] =
  createSafeContext<ContextState>("SystemStateProvider");
export const [SystemActionsProvider, useSystemActionsContext] =
  createSafeContext<ContextActions>("SystemActionsProvider");
