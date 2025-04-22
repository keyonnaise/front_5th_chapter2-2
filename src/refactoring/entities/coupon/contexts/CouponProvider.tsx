import { useMemo } from "react";
import { createSafeContext } from "../../../shared/lib";
import { useCoupons } from "../hooks";
import { Coupon } from "../model";

interface Props {
  coupons: Coupon[];
  children: React.ReactNode;
}

function CouponProvider({ coupons: initialCoupons, children }: Props) {
  const { coupons, addCoupon } = useCoupons(initialCoupons);

  const value = useMemo<ContextState>(
    () => ({
      coupons,
    }),
    [coupons],
  );

  const actions = useMemo<ContextActions>(
    () => ({
      addCoupon,
    }),
    [addCoupon],
  );

  return (
    <CouponStateProvider {...value}>
      <CouponActionsProvider {...actions}>{children}</CouponActionsProvider>
    </CouponStateProvider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Context API
 * -----------------------------------------------------------------------------------------------*/

interface ContextState {
  coupons: Coupon[];
}
interface ContextActions {
  addCoupon: (newCoupon: Coupon) => void;
}

export const [CouponStateProvider, useCouponStateContext] =
  createSafeContext<ContextState>("CouponProvider");
export const [CouponActionsProvider, useCouponActionsContext] =
  createSafeContext<ContextActions>("CouponProvider");

export default CouponProvider;
