import { useState } from "react";
import {
  useProductActionsContext,
  useProductStateContext,
} from "../../../entities/product/contexts";
import { Product } from "../../../entities/product/model";
import { ProductCreateForm } from "../../../features/product-create-form/ui";
import { ProductModifyForm } from "../../../features/product-modify-form/ui";
import { usePreservedCallback } from "../../../shared/hooks";

export const ProductManager = () => {
  const { products } = useProductStateContext("ProductManager");
  const { addProduct, modifyProduct } = useProductActionsContext("ProductManager");

  const [showProductCreateForm, setShowCreateProductForm] = useState(false);
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const cloned = new Set(prev);
      cloned.has(productId) ? cloned.delete(productId) : cloned.add(productId);
      return cloned;
    });
  };

  const handleProductAdd = usePreservedCallback((newProduct: Product) => {
    addProduct(newProduct);
    setShowCreateProductForm(false);
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowCreateProductForm(!showProductCreateForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showProductCreateForm ? "취소" : "새 상품 추가"}
      </button>
      {showProductCreateForm && <ProductCreateForm onProductAdd={handleProductAdd} />}

      <div className="space-y-2">
        {products.map((product, index) => (
          <div
            key={product.id}
            data-testid={`product-${index + 1}`}
            className="bg-white p-4 rounded shadow"
          >
            <button
              data-testid="toggle-button"
              onClick={() => toggleProductAccordion(product.id)}
              className="w-full text-left font-semibold"
            >
              {product.name} - {product.price}원 (재고: {product.stock})
            </button>
            {openProductIds.has(product.id) && (
              <ProductModifyForm product={product} onProductModify={modifyProduct} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
