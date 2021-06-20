import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { CountryService } from './country.service';
import { Country } from './interfaces/country.interface';

@JsonController('/countries')
@Service()
export class CountryController {
  constructor(
    private countryService: CountryService,
  ) {}

  @Get('/')
  async getCountries(): Promise<Country[]> {
    const countries = await this.countryService.getCountries();
    return countries;
  }
}
