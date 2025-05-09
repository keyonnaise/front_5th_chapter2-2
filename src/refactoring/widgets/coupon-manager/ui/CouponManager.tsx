import { useCouponActionsContext, useCouponStateContext } from "../../../entities/coupon/contexts";
import { CouponCreateForm } from "../../../features/coupon-create-form/ui";
import { CouponList } from "../../../features/coupon-list/ui";

export const CouponManager = () => {
  const { coupons } = useCouponStateContext("ProductManager");
  const { addCoupon } = useCouponActionsContext("ProductManager");

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <CouponCreateForm onCouponAdd={addCoupon} />
        <CouponList coupons={coupons} />
      </div>
    </div>
  );
};
