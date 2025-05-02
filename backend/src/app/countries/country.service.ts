import { Injectable, Logger } from '@nestjs/common';
import { CountryDetails, CountryListEntry } from '@swicon-country-demo/shared';
import { SoapService } from '../soap/soap.service';
import { CountryInfoSoapClient } from '../soap/types/country-info-soap.client.interface';
import { RawCountryListEntry } from './types/country-list-response.interface';
import { CacheService } from '../shared/cache/cache.service';

const COUNTRY_LIST_CACHE_KEY = 'country-list';
const COUNTRY_DETAILS_CACHE_KEY = 'country-details';
const WSDL_URL =
  'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';

@Injectable()
export class CountryService {
  private readonly logger = new Logger(CountryService.name);

  constructor(
    private readonly soapService: SoapService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Retrieves a list of countries from the SOAP service or cache.
   *
   * Uses a cached value if available; otherwise, it fetches the list from the SOAP client
   * and maps each raw country entry to a simplified structure.
   *
   * @returns {Promise<CountryListEntry[]>} A promise that resolves to an array of country list entries with ISO codes and names.
   */
  async getCountryList(): Promise<CountryListEntry[]> {
    return this.returnCached(COUNTRY_LIST_CACHE_KEY, 'Returning cached country list', async () => {
      const client = await this.soapService.getClient<CountryInfoSoapClient>(WSDL_URL);
      const [result] = await client.ListOfCountryNamesByNameAsync({});
      return result.ListOfCountryNamesByNameResult.tCountryCodeAndName.map(
        (c: RawCountryListEntry) => ({
          name: c.sName,
          code: c.sISOCode,
        }),
      );
    });
  }
  /**
   * Retrieves detailed information for a specific country based on its ISO code.
   *
   * If the information is cached, it is returned directly. Otherwise, the method fetches:
   * - Capital city
   * - Currency ISO code
   * - Country flag URL
   * - International phone code
   * from the SOAP service in parallel, and returns them in a structured format.
   *
   * @param {string} isoCode - The ISO 3166-1 alpha-2 code of the country (e.g., "US", "FR").
   * @returns {Promise<CountryDetails>} A promise that resolves to the country's detailed information.
   */
  async getCountryDetails(isoCode: string): Promise<CountryDetails> {
    return this.returnCached<CountryDetails>(
      COUNTRY_DETAILS_CACHE_KEY + isoCode,
      `Returning cached country details for ${isoCode}`,
      async () => {
        const client = await this.soapService.getClient<CountryInfoSoapClient>(WSDL_URL);
        const [[capitalResult], [currencyResult], [flagResult], [phoneCodeResult]] =
          await Promise.all([
            client.CapitalCityAsync({ sCountryISOCode: isoCode }),
            client.CountryCurrencyAsync({ sCountryISOCode: isoCode }),
            client.CountryFlagAsync({ sCountryISOCode: isoCode }),
            client.CountryIntPhoneCodeAsync({ sCountryISOCode: isoCode }),
          ]);

        return {
          capital: capitalResult.CapitalCityResult,
          currency: currencyResult.CountryCurrencyResult.sISOCode,
          flagUrl: flagResult.CountryFlagResult,
          phoneCode: phoneCodeResult.CountryIntPhoneCodeResult,
        };
      },
    );
  }

  /**
   * Returns a cached value if available; otherwise, invokes the provided callback
   * to retrieve the value, caches it, and returns the result.
   *
   * This method also logs an info message when a cached result is returned.
   *
   * @template T
   * @param {string} key - The key used to retrieve or store the cached value.
   * @param {string} infoMessage - A message to log if a cached value is returned.
   * @param {() => Promise<T>} cb - An asynchronous callback that returns the value to cache if not already cached.
   * @returns {Promise<T>} A promise that resolves to the cached or freshly retrieved value.
   * @private
   */
  private async returnCached<T>(
    key: string,
    infoMessage: string,
    cb: () => Promise<T>,
  ): Promise<T> {
    const cached = this.cacheService.get<T>(key);
    if (cached) {
      this.logger.log(infoMessage);
      return cached;
    }

    const result = await cb();
    this.cacheService.set<T>(key, result);
    return result;
  }
}
