import { Product } from './product.interface';

export interface SearchProductsResponse {
  products: Product[];
  limit: number;
  offset: number;
  total: number;
  search_params: {
    q?: string;
  };
}
