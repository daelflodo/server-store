import { ProductType } from "../enum/product-type";

export interface IProduct {
  name: string;
  price: number;
  image?:string;
  type: ProductType;
}
