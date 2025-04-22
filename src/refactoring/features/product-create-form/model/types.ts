import { Product } from "../../../entities/product/model";

export type CreateProductFormFields = Omit<Product, "id">;
