import { Product } from "../../../entities/product/model";
import { useProductModifyForm } from "../hooks";

interface Props {
  product: Product;
  onProductModify: (product: Product) => void;
}

export const ProductModifyForm = ({ product, onProductModify }: Props) => {
  const {
    fields,
    discount,
    setFields,
    addDiscount,
    removeDiscount,
    modifyProduct: completeModify,
    onFieldChange,
    onDiscountChange,
  } = useProductModifyForm({
    onProductModify,
  });
  const editing = fields?.id === product.id;

  return (
    <div className="mt-2">
      {editing ? (
        <div>
          <div className="mb-4">
            <label className="block mb-1">상품명: </label>
            <input
              type="text"
              value={fields.name}
              onChange={(e) => onFieldChange("name", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">가격: </label>
            <input
              type="number"
              value={fields.price}
              onChange={(e) => onFieldChange("price", parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">재고: </label>
            <input
              type="number"
              value={fields.stock}
              onChange={(e) => onFieldChange("stock", parseInt(e.target.value))}
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
                  onClick={() => removeDiscount(index)}
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
                onClick={() => addDiscount()}
                className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                할인 추가
              </button>
            </div>
          </div>
          <button
            onClick={completeModify}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
          >
            수정 완료
          </button>
        </div>
      ) : (
        <div>
          {product.discounts.map((discount, i) => (
            <div key={i} className="mb-2">
              <span>
                {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
              </span>
            </div>
          ))}
          <button
            data-testid="modify-button"
            onClick={() => setFields(product)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
          >
            수정
          </button>
        </div>
      )}
    </div>
  );
};
