import { useCallback, useState } from "react";
import { Product } from "../../entities/product/model";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = useCallback((product: Product) => {
    setProducts((prev) => [...prev, product]);
  }, []);

  const updateProduct = useCallback((product: Product) => {
    setProducts((prev) => prev.map((current) => (current.id === product.id ? product : current)));
  }, []);

  return {
    products,
    addProduct,
    updateProduct,
  };
};
