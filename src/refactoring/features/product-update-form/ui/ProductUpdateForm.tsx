import { Discount, Product } from "../../../entities/product/model";
import { usePreservedCallback } from "../../../shared/hooks";
import { UpdateProductFormFields } from "../model";

interface Props {
  product: Product;
  discount: Discount;
  fields: UpdateProductFormFields | null;
  onProductEdit: (product: Product) => void;
  onProductUpdate: () => void;
  onProductChange: <K extends keyof UpdateProductFormFields>(
    productId: string,
    key: K,
    value: UpdateProductFormFields[K]
  ) => void;
  onAddDiscount: (productId: string) => void;
  onRemoveDiscount: (productId: string, index: number) => void;
  onDiscountChange: <K extends keyof Discount>(key: K, value: Discount[K]) => void;
}

export const ProductUpdateForm = ({
  product,
  discount,
  fields,
  onProductEdit,
  onProductChange,
  onProductUpdate,
  onAddDiscount,
  onRemoveDiscount,
  onDiscountChange,
}: Props) => {
  const editing = fields?.id === product.id;

  const handleProductChange = usePreservedCallback(
    <K extends keyof UpdateProductFormFields>(key: K, value: UpdateProductFormFields[K]) => {
      onProductChange(product.id, key, value);
    }
  );

  return (
    <div className="mt-2">
      {editing ? (
        <div>
          <div className="mb-4">
            <label className="block mb-1">상품명: </label>
            <input
              type="text"
              value={fields.name}
              onChange={(e) => handleProductChange("name", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">가격: </label>
            <input
              type="number"
              value={fields.price}
              onChange={(e) => handleProductChange("price", parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">재고: </label>
            <input
              type="number"
              value={fields.stock}
              onChange={(e) => handleProductChange("stock", parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* 할인 정보 수정 부분 */}
          <div>
            <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
            {fields.discounts.map((discount, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>
                  {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
                </span>
                <button
                  onClick={() => onRemoveDiscount(product.id, index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            ))}
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="수량"
                value={discount.quantity}
                onChange={(e) => onDiscountChange("quantity", parseInt(e.target.value))}
                className="w-1/3 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="할인율 (%)"
                value={discount.rate * 100}
                onChange={(e) => onDiscountChange("rate", parseInt(e.target.value) / 100)}
                className="w-1/3 p-2 border rounded"
              />
              <button
                onClick={() => onAddDiscount(product.id)}
                className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                할인 추가
              </button>
            </div>
          </div>
          <button
            onClick={onProductUpdate}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
          >
            수정 완료
          </button>
        </div>
      ) : (
        <div>
          {product.discounts.map((discount, index) => (
            <div key={index} className="mb-2">
              <span>
                {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
              </span>
            </div>
          ))}
          <button
            data-testid="modify-button"
            onClick={() => onProductEdit(product)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
          >
            수정
          </button>
        </div>
      )}
    </div>
  );
};
