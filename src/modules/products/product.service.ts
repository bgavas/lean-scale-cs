import { Service } from 'typedi';
import { ElasticSearch } from '../../elastic-search';
import { GetProductsDto } from './dto/get-products.dto';
import { SearchProductsResponse } from './interfaces/search-products-response.interface';

@Service()
export class ProductService {
  constructor(
    private es: ElasticSearch,
  ) {}

  async searchProducts(getProductsDto: GetProductsDto): Promise<SearchProductsResponse> {
    const limit = getProductsDto.limit || 10;
    const offset = getProductsDto.offset || 0;
    const q = getProductsDto.q;

    const products = await this.es.searchProducts(limit, offset, q);
    return {
      products,
      limit,
      offset,
      total: products.length,
      search_params: { q },
    };
  }
}
