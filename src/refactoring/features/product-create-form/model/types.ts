import { Product } from "../../../entities/product/model";

export type ProductCreateFormFields = Omit<Product, "id">;
