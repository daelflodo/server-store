import { ProductType } from "../enum/product-type";

export interface IProduct {
  id?: string;
  name: string;
  price: number;
  image?:string;
  type: ProductType;
}
