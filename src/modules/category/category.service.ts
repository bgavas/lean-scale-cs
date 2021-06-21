import { Service } from 'typedi';
import { Magento } from '../../magento';
import { Category } from './interfaces/category.interface';
import { getTranslation, replaceRecursive } from '../../utils/helper';
import { LanguageFile } from '../../utils/enums';

@Service()
export class CategoryService {
  constructor(
    private magento: Magento,
  ) {}

  async getCategories(): Promise<Category> {
    const categories = await this.magento.getCategories();

    // Read translation JSON file if language is not en
    const translation = getTranslation(LanguageFile.Category);

    if (!translation) {
      return categories;
    }
    return replaceRecursive(categories, 'name', translation);
  }
}
