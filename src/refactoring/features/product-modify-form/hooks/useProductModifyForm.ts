import { useState } from "react";
import { ProductModifyFormFields } from "../model";
import { usePreservedCallback } from "../../../shared/hooks";
import { Discount, Product } from "../../../entities/product/model";

const INITIAL_DISCOUNT: Discount = {
  quantity: 0,
  rate: 0,
};

interface Options {
  onProductModify: (product: Product) => void;
}

export const useProductModifyForm = ({ onProductModify: onProductModify }: Options) => {
  const [fields, setFields] = useState<ProductModifyFormFields | null>(null);
  const [discount, setDiscount] = useState<Discount>(INITIAL_DISCOUNT);

  const modifyProduct = usePreservedCallback(() => {
    if (!fields) return;
    onProductModify(fields);
    setFields(null);
  });

  const addDiscount = usePreservedCallback(() => {
    setFields((prev) => {
      if (!prev) return null;

      const modified = { ...prev, discounts: [...prev.discounts, discount] };

      onProductModify(modified);
      setDiscount(INITIAL_DISCOUNT);

      return modified;
    });
  });

  const removeDiscount = usePreservedCallback((index: number) => {
    setFields((prev) => {
      if (!prev) return null;

      const modified = { ...prev, discounts: prev.discounts.filter((_, i) => i !== index) };
      onProductModify(modified);

      return modified;
    });
  });

  const onFieldChange = usePreservedCallback(
    <K extends keyof ProductModifyFormFields>(key: K, value: ProductModifyFormFields[K]) => {
      setFields((prev) => {
        if (!prev) return null;

        const modified = { ...prev, [key]: value };

        if (key === "stock") {
          onProductModify(modified);
        }

        return modified;
      });
    }
  );

  const onDiscountChange = usePreservedCallback(
    <K extends keyof Discount>(key: K, value: Discount[K]) => {
      setDiscount((prev) => ({ ...prev, [key]: value }));
    }
  );

  return {
    fields,
    discount,
    setFields,
    addDiscount,
    removeDiscount,
    modifyProduct,
    onFieldChange,
    onDiscountChange,
  };
};
