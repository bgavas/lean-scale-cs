import { Service } from 'typedi';
import expressHttpContext from 'express-http-context';
import { Magento } from '../../magento';
import { Country } from './interfaces/country';
import { getTranslation } from '../../utils/helper';
import { LanguageFile } from '../../utils/enums';

@Service()
export class CountryService {
  constructor(
    private magento: Magento,
  ) {}

  async getCountries(): Promise<Country[]> {
    const countries = await this.magento.getCountries();

    // Read translation JSON file if necessary
    const lang = expressHttpContext.get('lang');
    const translation = getTranslation(LanguageFile.Country, lang);

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
