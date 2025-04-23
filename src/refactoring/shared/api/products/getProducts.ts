import { Product } from "../../../entities/product/model";
import { fetcher } from "../../lib/fetcher";

export const getProducts = async () => {
  return fetcher<Product[]>("/api/products");
};
