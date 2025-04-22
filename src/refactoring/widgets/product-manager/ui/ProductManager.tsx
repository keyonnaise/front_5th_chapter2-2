import { useState } from "react";
import { Discount, Product } from "../../../entities/product/model";
import { usePreservedCallback } from "../../../shared/hooks";
import { ProductCreateForm } from "../../../features/product-create-form/ui";
import { ProductUpdateForm } from "../../../features/product-update-form/ui";
import { UpdateProductFormFields } from "../../../features/product-update-form/model";

interface Props {
  products: Product[];
  onProductAdd: (newProduct: Product) => void;
  onProductUpdate: (updatedProduct: Product) => void;
}

export const ProductManager = ({ products, onProductAdd, onProductUpdate }: Props) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const cloned = new Set(prev);
      cloned.has(productId) ? cloned.delete(productId) : cloned.add(productId);
      return cloned;
    });
  };

  // handleProductEdit 함수 수정
  const handleProductEdit = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // 새로운 핸들러 함수 추가
  const handleProductChange = usePreservedCallback(
    <K extends keyof UpdateProductFormFields>(
      productId: string,
      key: K,
      value: UpdateProductFormFields[K]
    ) => {
      if (key === "stock") {
        const product = products.find((product) => product.id === productId);
        if (product) {
          const updatedProduct = { ...product, [key]: value };
          onProductUpdate(updatedProduct);
          setEditingProduct(updatedProduct);
        }
      }

      if (editingProduct?.id === productId) {
        const updatedProduct = { ...editingProduct, [key]: value };
        setEditingProduct(updatedProduct);
      }
    }
  );

  // 수정 완료 핸들러 함수 추가
  const handleProductUpdate = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleDiscountChange = usePreservedCallback(
    <K extends keyof Discount>(key: K, value: Discount[K]) => {
      setNewDiscount((prev) => ({ ...prev, [key]: value }));
    }
  );

  const handleProductAdd = usePreservedCallback((newProduct: Product) => {
    onProductAdd(newProduct);
    setShowNewProductForm(false);
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && <ProductCreateForm onProductAdd={handleProductAdd} />}

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
              <ProductUpdateForm
                product={product}
                discount={newDiscount}
                fields={editingProduct}
                onProductEdit={handleProductEdit}
                onProductUpdate={handleProductUpdate}
                onProductChange={handleProductChange}
                onAddDiscount={handleAddDiscount}
                onRemoveDiscount={handleRemoveDiscount}
                onDiscountChange={handleDiscountChange}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
