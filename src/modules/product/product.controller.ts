import { Get, JsonController, QueryParams } from 'routing-controllers';
import { Service } from 'typedi';
import { ProductService } from './product.service';
import { GetProductsDto } from './dto/get-products.dto';
import { SearchProductsResponse } from './interfaces/search-products-response.interface';

@JsonController('/products')
@Service()
export class ProductController {
  constructor(
    private productService: ProductService,
  ) {}

  @Get('/')
  async searchProducts(
    @QueryParams() getProductsDto: GetProductsDto,
  ): Promise<SearchProductsResponse> {
    const result = await this.productService.searchProducts(getProductsDto);
    return result;
  }
}
