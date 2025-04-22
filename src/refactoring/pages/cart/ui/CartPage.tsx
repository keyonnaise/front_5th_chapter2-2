import CartProvider from "../../../entities/cart/contexts/CartProvider";
import CartTotal from "../../../entities/cart/ui/CartTotal";
import { useCouponStateContext } from "../../../entities/coupon/contexts";
import { useProductStateContext } from "../../../entities/product/contexts";
import CartList from "../../../features/cart-list/ui/CartList";
import CouponSelector from "../../../features/coupon-selector/ui/CouponSelector";
import ProductList from "../../../features/product-list/ui/ProductList";

export const CartPage = () => {
  const { products } = useProductStateContext("CartPage");
  const { coupons } = useCouponStateContext("CartPage");

  return (
    <CartProvider>
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
    </CartProvider>
  );
};
