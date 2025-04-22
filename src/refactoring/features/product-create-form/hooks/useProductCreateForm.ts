import { useState } from "react";
import { ProductCreateFormFields } from "../model";
import { usePreservedCallback } from "../../../shared/hooks";
import { Product } from "../../../entities/product/model";

const INITIAL_FIELDS: ProductCreateFormFields = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

interface Options {
  onProductAdd: (product: Product) => void;
}

export const useProductCreateForm = ({ onProductAdd }: Options) => {
  const [fields, setFields] = useState<ProductCreateFormFields>(INITIAL_FIELDS);

  const addProduct = usePreservedCallback(() => {
    onProductAdd({ ...fields, id: Date.now().toString() });
    setFields(INITIAL_FIELDS);
  });

  const onFieldChange = usePreservedCallback(
    <K extends keyof ProductCreateFormFields>(key: K, value: ProductCreateFormFields[K]) => {
      setFields((prev) => ({ ...prev, [key]: value }));
    }
  );

  return {
    fields,
    setFields,
    addProduct,
    onFieldChange,
  };
};
