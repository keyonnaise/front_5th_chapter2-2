import { useState } from "react";
import CouponProvider from "./entities/coupon/contexts/CouponProvider";
import { Coupon } from "./entities/coupon/model";
import ProductProvider from "./entities/product/contexts/ProductProvider";
import { Product } from "./entities/product/model";
import { AdminPage } from "./pages/admin/ui";
import { CartPage } from "./pages/cart/ui";
import { getCoupons } from "./shared/api/coupons/getCoupons";
import { getProducts } from "./shared/api/products";
import { useLoadableState } from "./shared/hooks/useLoadableState";
import { storage } from "./shared/lib";

const initialProducts: Product[] = [];

const initialCoupons: Coupon[] = [];

const App = () => {
  const [authorized, setAuthorized] = useState(false);

  const { data } = useLoadableState(getInitialData);

  if (data === null) return null;

  const savedProducts = data[0] || storage.getItem("products");
  const savedCoupons = data[1] || storage.getItem("coupons");

  return (
    <ProductProvider products={savedProducts || initialProducts}>
      <CouponProvider coupons={savedCoupons || initialCoupons}>
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

/* -------------------------------------------------------------------------------------------------
 * Utils
 * -----------------------------------------------------------------------------------------------*/

const getInitialData = () => {
  const requests = [getProducts(), getCoupons()] as const;
  return Promise.all(requests);
};

export default App;
