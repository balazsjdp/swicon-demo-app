import { Injectable, Logger } from '@nestjs/common';
import { CountryDetailsDto } from '@swicon-country-demo/shared';
import { SoapService } from '../soap/soap.service';
import { CountryInfoSoapClient } from '../soap/types/country-info-soap.client.interface';
import { RawCountryListEntry } from './types/soap-response-types/country-list-response.interface';
import { CountryListEntry } from './types/country-list-entry.interface';
import { CountryListOptions } from './types/country-list-options.interface';

const WSDL_URL =
  'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';

@Injectable()
export class CountryService {
  private readonly logger = new Logger(CountryService.name);

  constructor(private readonly soapService: SoapService) {}

  /**
   * Retrieves a list of countries from the SOAP service.
   * Optionally enriches each country entry with additional fields.
   */
  async getCountryList(options: CountryListOptions): Promise<CountryListEntry[]> {
    this.logger.log(`Fetching country list with options: ${JSON.stringify(options)}`);

    const client = await this.soapService.getClient<CountryInfoSoapClient>(WSDL_URL);
    const [result] = await client.ListOfCountryNamesByNameAsync({});
    const rawEntries = result.ListOfCountryNamesByNameResult.tCountryCodeAndName;

    this.logger.log(`Retrieved ${rawEntries.length} countries from SOAP service`);

    return Promise.all(
      rawEntries.map((entry: RawCountryListEntry) =>
        this.decorateCountry(entry, client, options),
      ),
    );
  }

  /**
   * Retrieves detailed information for a specific country.
   */
  async getCountryDetails(isoCode: string): Promise<CountryDetailsDto> {
    this.logger.log(`Fetching country details for: ${isoCode}`);

    const client = await this.soapService.getClient<CountryInfoSoapClient>(WSDL_URL);
    this.logger.debug('SOAP client initialized for country details');

    const [[capitalResult], [currencyResult], [flagResult], [phoneCodeResult]] =
      await Promise.all([
        client.CapitalCityAsync({ sCountryISOCode: isoCode }),
        client.CountryCurrencyAsync({ sCountryISOCode: isoCode }),
        client.CountryFlagAsync({ sCountryISOCode: isoCode }),
        client.CountryIntPhoneCodeAsync({ sCountryISOCode: isoCode }),
      ]);

    this.logger.log(`Successfully fetched details for country: ${isoCode}`);

    return {
      capital: capitalResult.CapitalCityResult,
      currency: currencyResult.CountryCurrencyResult.sISOCode,
      flagUrl: flagResult.CountryFlagResult,
      phoneCode: phoneCodeResult.CountryIntPhoneCodeResult,
    };
  }

  /**
   * Enriches a single raw country entry with optional fields (e.g. currency, flag, etc.).
   */
  private async decorateCountry(
    entry: RawCountryListEntry,
    client: CountryInfoSoapClient,
    options: CountryListOptions,
  ): Promise<CountryListEntry> {
    const country: CountryListEntry = {
      code: entry.sISOCode,
      name: entry.sName,
    };

    if(Object.keys(options).length === 0) {
      this.logger.debug(`No options provided for ${entry.sISOCode}, returning basic info`);
      return country;
    }

    const tasks: Promise<void>[] = [];

    if (options.currency) {
      tasks.push(
        client
          .CountryCurrencyAsync({ sCountryISOCode: entry.sISOCode })
          .then(([res]) => {
            country.currency = res.CountryCurrencyResult?.sISOCode ?? null;
          }),
      );
    }

    if (options.capital) {
      tasks.push(
        client
          .CapitalCityAsync({ sCountryISOCode: entry.sISOCode })
          .then(([res]) => {
            country.capital = res.CapitalCityResult;
          }),
      );
    }

    if (options.flagUrl) {
      tasks.push(
        client
          .CountryFlagAsync({ sCountryISOCode: entry.sISOCode })
          .then(([res]) => {
            country.flagUrl = res.CountryFlagResult;
          }),
      );
    }

    if (options.phoneCode) {
      tasks.push(
        client
          .CountryIntPhoneCodeAsync({ sCountryISOCode: entry.sISOCode })
          .then(([res]) => {
            country.phoneCode = String(res.CountryIntPhoneCodeResult);
          }),
      );
    }

    await Promise.all(tasks);
    this.logger.debug(`Finished decorating ${entry.sISOCode} with options: ${JSON.stringify(options)}`);
    return country;
  }
}