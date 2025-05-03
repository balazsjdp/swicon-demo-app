import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from '../countries/country.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountryDetails, CountryListEntry } from '@swicon-country-demo/shared';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of countries' })
  @ApiResponse({ status: 200, type: [CountryListEntry] })
  async getAllCountries() {
    return this.countryService.getCountryList();
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get details for a specific country' })
  @ApiResponse({ status: 200, type: CountryDetails })
  async getCountryDetails(@Param('code') code: string) {
    return this.countryService.getCountryDetails(code);
  }
}
