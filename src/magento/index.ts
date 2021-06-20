import axios, { AxiosInstance } from 'axios';
import { Service } from 'typedi';
import { Country } from './interfaces/country.interface';

@Service()
export class Magento {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://m2.leanscale.com',
    });

    this.client.interceptors.response.use((response) => {
      return response.data;
    });
  }

  async getCountries(): Promise<Country[]> {
    const countries = await this.client.get('/rest/default/V1/directory/countries') as Country[];
    return countries;
  }
}
