import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CountryService } from '../countries/country.service';
import {
  CountryDetailsDto,
  CountryListEntryDto,
  CountryListOptionsDto,
} from '@swicon-country-demo/shared';
import { CountryListOptions } from './types/country-list-options.interface';

@ApiTags('countries')
@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  /**
   * Returns a list of countries with optional enrichment fields (e.g., currency, capital).
   * Query parameters determine which extra fields to include.
   *
   * Example: GET /countries?currency=true&flagUrl=true
   */
  @Get()
  @ApiOperation({ summary: 'Get list of countries with optional enriched fields' })
  @ApiResponse({ status: 200, type: [CountryListEntryDto] })
  @ApiQuery({
    name: 'options',
    type: CountryListOptionsDto,
    description: 'Optional enrichment fields to include in the response',
  })
  async getAllCountries(@Query() query: CountryListOptions) {
    return this.countryService.getCountryList(query);
  }

  /**
   * Returns detailed information for a specific country identified by its ISO code.
   *
   * Example: GET /countries/HU
   */
  @Get(':code')
  @ApiOperation({ summary: 'Get details for a specific country by ISO code' })
  @ApiResponse({ status: 200, type: CountryDetailsDto })
  async getCountryDetails(@Param('code') code: string) {
    return this.countryService.getCountryDetails(code);
  }
}

