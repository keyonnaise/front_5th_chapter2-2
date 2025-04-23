import { HttpResponse, http } from "msw";
import products from './response/products.json' assert { type: 'json' };
import coupons from './response/coupons.json' assert { type: 'json' };

export const handlers = [
  /**
   * Products handlers
   */
  http.get("/api/products", () => {
    return HttpResponse.json(products);
  }),
  http.post("/api/products", () => {}),
  http.put("/api/products", () => {}),
  http.delete("/api/products", () => {}),

  /**
   * Coupons handlers
   */
  http.get("/api/coupons", () => {
    return HttpResponse.json(coupons);
  }),
  http.post("/api/coupons", () => {}),
  http.put("/api/coupons", () => {}),
  http.delete("/api/coupons", () => {}),
];
