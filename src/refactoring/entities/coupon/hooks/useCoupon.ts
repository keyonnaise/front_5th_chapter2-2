import { useCallback, useEffect, useState } from "react";
import { storage } from "../../../shared/lib";
import { Coupon } from "../model";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState(initialCoupons);

  useEffect(() => {
    storage.setItem("coupons", coupons);
  }, [coupons]);

  const addCoupon = useCallback((coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
  }, []);

  return {
    coupons,
    addCoupon,
  };
};
