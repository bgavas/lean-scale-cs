import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { CountryService } from './country.service';
import { Country } from './interfaces/country';

@JsonController('/countries')
@Service()
export class CountryController {
  constructor(
    private countryService: CountryService,
  ) {}

  @Get('/')
  async listCountries(): Promise<{ countries: Country[] }> {
    const countries = await this.countryService.getCountries();
    return { countries };
  }
}
