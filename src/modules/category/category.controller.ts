import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { CategoryService } from './category.service';
import { Category } from './interfaces/category.interface';

@JsonController('/categories')
@Service()
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
  ) {}

  @Get('/')
  async getCategories(): Promise<Category> {
    const categories = await this.categoryService.getCategories();
    return categories;
  }
}
