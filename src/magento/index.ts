import axios, { AxiosInstance } from 'axios';
import { Service } from 'typedi';
import { MAGENTO } from '../utils/config';
import { CategoryProduct } from './interfaces/category-product.interface';
import { Category } from './interfaces/category.interface';
import { Country } from './interfaces/country.interface';

@Service()
export class Magento {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: MAGENTO.URL,
    });

    // Set authorization header for every request
    this.client.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${MAGENTO.ACCESS_TOKEN}`;
      return config;
    });

    this.client.interceptors.response.use((response) => {
      return response.data;
    });
  }

  async getCountries(): Promise<Country[]> {
    const countries = await this.client.get('/directory/countries') as Country[];
    return countries;
  }

  async getCategories(): Promise<Category> {
    const categories = await this.client.get('/categories') as Category;
    return categories;
  }

  async getCategoryProducts(categoryId: number): Promise<CategoryProduct[]> {
    const products = await this.client.get(
      `/categories/${categoryId}/products`,
    ) as CategoryProduct[];
    return products;
  }

  async searchProducts(skus: string[], size?: number, page?: number): Promise<any[]> {
    const query = '';
    const response = await this.client.get(`/products${query}`, {
      params: {
        'searchCriteria[filter_groups][0][filters][0][field]': 'sku',
        'searchCriteria[filter_groups][0][filters][0][condition_type]': 'in',
        'searchCriteria[filter_groups][0][filters][0][value]': skus.toString(),
        'searchCriteria[pageSize]': size,
        'searchCriteria[currentPage]': page,
      },
    }) as any;
    return response.items;
  }
}
