import { Coupon } from "../../../entities/coupon/model";
import { useCouponCreateForm } from "../hooks";

interface Props {
  onCouponAdd(newCoupon: Coupon): void;
}

export const CouponCreateForm = ({ onCouponAdd }: Props) => {
  const { fields, addCoupon, onFieldChange } = useCouponCreateForm({ onCouponAdd });

  return (
    <div className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="쿠폰 이름"
        value={fields.name}
        onChange={(e) => onFieldChange("name", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="쿠폰 코드"
        value={fields.code}
        onChange={(e) => onFieldChange("code", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <select
          value={fields.discountType}
          onChange={(e) => onFieldChange("discountType", e.target.value as Coupon["discountType"])}
          className="w-full p-2 border rounded"
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <input
          type="number"
          placeholder="할인 값"
          value={fields.discountValue}
          onChange={(e) => onFieldChange("discountValue", parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={addCoupon}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </button>
    </div>
  );
};
