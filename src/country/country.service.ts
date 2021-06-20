import { Service } from 'typedi';
import { Magento } from '../magento';
import { Country } from './interfaces/country';

@Service()
export class CountryService {
  constructor(
    private magento: Magento,
  ) {}

  async getCountries(): Promise<Country[]> {
    const countries = await this.magento.getCountries();
    return countries.map(c => ({
      id: c.id,
      name: c.full_name_locale,
    }));
  }
}
