import { useEffect, useState } from "react";
import { usePreservedCallback } from "../../../shared/hooks";
import { storage } from "../../../shared/lib";
import { Product } from "../model";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    storage.setItem("products", products);
  }, [products]);

  const addProduct = usePreservedCallback((product: Product) => {
    setProducts((prev) => [...prev, product]);
  });

  const modifyProduct = usePreservedCallback((product: Product) => {
    setProducts((prev) => prev.map((current) => (current.id === product.id ? product : current)));
  });

  return {
    products,
    addProduct,
    modifyProduct,
  };
};
