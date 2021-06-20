import axios, { AxiosInstance } from 'axios';
import { Service } from 'typedi';
import { MAGENTO } from '../utils/config';
import { Category } from './interfaces/category.interface';
import { Country } from './interfaces/country.interface';

@Service()
export class Magento {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://m2.leanscale.com/rest/default/V1',
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

  async getCategories(): Promise<Category[]> {
    const categories = await this.client.get('/categories') as any;
    return categories;
  }
}
