import { Product } from "./Product";

export interface WishlistResponse {
  status: string;
  message?: string;
  count?: number;
  data: Product[];
  wishListData?: Product[];
}
