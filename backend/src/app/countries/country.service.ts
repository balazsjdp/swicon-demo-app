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
   * Retrieves a list of countries.
   * @returns {Promise<CountryListEntry[]>} A promise that resolves to an array of country list entries.
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
   * @param {string} isoCode - The ISO code of the country.
   * @returns {Promise<CountryDetails>} A promise that resolves to the details of the specified country.
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
   * Returns a cached value if available; otherwise, invokes the callback to retrieve the value and caches it.
   * @template T
   * @param {string} key - The cache key.
   * @param {string} infoMessage - A message to log or track when caching is used.
   * @param {() => Promise<T>} cb - The callback function to execute if the value is not cached.
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
