import { useCallback, useState } from "react";
import { Coupon } from "../../entities/coupon/model";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState(initialCoupons);

  const addCoupon = useCallback((coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
  }, []);

  return {
    coupons,
    addCoupon,
  };
};
