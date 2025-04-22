import { useState } from "react";
import { Coupon } from "../../../entities/coupon/model";
import { CouponCreateFormField } from "../model";
import { usePreservedCallback } from "../../../shared/hooks";

const INITIAL_FIELDS: CouponCreateFormField = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
};

interface Options {
  onCouponAdd: (coupon: Coupon) => void;
}

export const useCouponCreateForm = ({ onCouponAdd }: Options) => {
  const [fields, setFields] = useState<CouponCreateFormField>(INITIAL_FIELDS);

  const addCoupon = usePreservedCallback(() => {
    onCouponAdd(fields);
    setFields(INITIAL_FIELDS);
  });

  const onFieldChange = usePreservedCallback(
    <K extends keyof CouponCreateFormField>(key: K, value: CouponCreateFormField[K]) => {
      setFields((prev) => ({ ...prev, [key]: value }));
    }
  );

  return {
    fields,
    setFields,
    addCoupon,
    onFieldChange,
  };
};

// {
//     name: "",
//     code: "",
//     discountType: "percentage",
//     discountValue: 0,
//   }
