import { useMemo } from "react";
import { createSafeContext } from "../../../shared/lib";
import { useProducts } from "../hooks";
import { Product } from "../model";

interface Props {
  products: Product[];
  children: React.ReactNode;
}

function ProductProvider({ products: initialProducts, children }: Props) {
  const { products, addProduct, modifyProduct } = useProducts(initialProducts);

  const value = useMemo<ContextState>(
    () => ({
      products,
    }),
    [products],
  );

  const actions = useMemo<ContextActions>(
    () => ({
      addProduct,
      modifyProduct,
    }),
    [addProduct, modifyProduct],
  );

  return (
    <ProductStateProvider {...value}>
      <ProductActionsProvider {...actions}>{children}</ProductActionsProvider>
    </ProductStateProvider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Context API
 * -----------------------------------------------------------------------------------------------*/

interface ContextState {
  products: Product[];
}

interface ContextActions {
  addProduct: (product: Product) => void;
  modifyProduct: (product: Product) => void;
}

export const [ProductStateProvider, useProductStateContext] =
  createSafeContext<ContextState>("ProductStateProvider");
export const [ProductActionsProvider, useProductActionsContext] =
  createSafeContext<ContextActions>("ProductActionsProvider");

export default ProductProvider;
