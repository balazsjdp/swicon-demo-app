import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from '../countries/country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getAllCountries() {
    return this.countryService.getCountryList();
  }

  @Get(':code')
  async getCountryDetails(@Param('code') code: string) {
    return this.countryService.getCountryDetails(code);
  }
}
