import { Coupon } from "../../../entities/coupon/model";
import { Product } from "../../../entities/product/model";
import { CartItem } from "../../../entities/cart/model/types";
import { CartManagerProvider } from "../../../widgets/cart-manager/contexts";
import { useCart } from "../../../entities/cart/hooks";
import { useSystemStateContext } from "../../../app/contexts";
import ProductList from "../../../features/product-list/ui/ProductList";
import CartList from "../../../features/cart-list/ui/CartList";
import CouponSelector from "../../../features/coupon-selector/ui/CouponApplyer";
import CartTotal from "../../../entities/cart/ui/CartTotal";

export const CartPage = () => {
  const { products, coupons } = useSystemStateContext("CartPage");

  return (
    <CartManagerProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">장바구니</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductList products={products} />
          <div>
            <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
            <CartList />
            <CouponSelector coupons={coupons} />
            <CartTotal />
          </div>
        </div>
      </div>
    </CartManagerProvider>
  );
};
