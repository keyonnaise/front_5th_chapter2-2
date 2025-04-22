import { useState } from "react";
import CouponProvider from "./entities/coupon/contexts/CouponProvider";
import { Coupon } from "./entities/coupon/model";
import ProductProvider from "./entities/product/contexts/ProductProvider";
import { Product } from "./entities/product/model";
import { AdminPage } from "./pages/admin/ui";
import { CartPage } from "./pages/cart/ui";

const initialProducts: Product[] = [
  {
    id: "p1",
    name: "상품1",
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
  },
  {
    id: "p2",
    name: "상품2",
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: "p3",
    name: "상품3",
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];

const initialCoupons: Coupon[] = [
  {
    name: "5000원 할인 쿠폰",
    code: "AMOUNT5000",
    discountType: "amount",
    discountValue: 5000,
  },
  {
    name: "10% 할인 쿠폰",
    code: "PERCENT10",
    discountType: "percentage",
    discountValue: 10,
  },
];

const App = () => {
  const [authorized, setAuthorized] = useState(false);

  return (
    <ProductProvider products={initialProducts}>
      <CouponProvider coupons={initialCoupons}>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
              <button
                onClick={() => setAuthorized((prev) => !prev)}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
              >
                {authorized ? "장바구니 페이지로" : "관리자 페이지로"}
              </button>
            </div>
          </nav>
          <main className="container mx-auto mt-6">
            {authorized ? <AdminPage /> : <CartPage />}
          </main>
        </div>
      </CouponProvider>
    </ProductProvider>
  );
};

export default App;
