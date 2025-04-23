import { Coupon } from "../../../entities/coupon/model";
import { fetcher } from "../../lib/fetcher";

export const getCoupons = async () => {
  return fetcher<Coupon[]>("/api/coupons");
};
