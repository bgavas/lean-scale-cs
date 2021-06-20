import { Service } from 'typedi';
import { Magento } from '../../magento';
import { Country } from './interfaces/country.interface';
import { getTranslation } from '../../utils/helper';
import { LanguageFile } from '../../utils/enums';

@Service()
export class CountryService {
  constructor(
    private magento: Magento,
  ) {}

  async getCountries(): Promise<Country[]> {
    const countries = await this.magento.getCountries();

    // Read translation JSON file if language is not en
    const translation = getTranslation(LanguageFile.Country);

    return countries.map((c) => {
      let name = c.full_name_locale;
      if (translation && translation[name]) {
        name = translation[name];
      }

      return {
        name,
        id: c.id,
      };
    });
  }
}
