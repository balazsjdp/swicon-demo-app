import { CountryListResponse } from '../../countries/types/soap-response-types/country-list-response.interface';
import { CapitalCityResponse } from '../../countries/types/soap-response-types/capital-city-response.interface';
import { CurrencyResponse } from '../../countries/types/soap-response-types/currency-response.interface';
import { FlagResponse } from '../../countries/types/soap-response-types/flag-response.interface';
import { PhoneCodeResponse } from '../../countries/types/soap-response-types/phone-code-response.interface';
export interface CountryInfoSoapClient {
  ListOfCountryNamesByNameAsync(args: object): Promise<[CountryListResponse]>;
  CapitalCityAsync(args: { sCountryISOCode: string }): Promise<[CapitalCityResponse]>;
  CountryCurrencyAsync(args: { sCountryISOCode: string }): Promise<[CurrencyResponse]>;
  CountryFlagAsync(args: { sCountryISOCode: string }): Promise<[FlagResponse]>;
  CountryIntPhoneCodeAsync(args: { sCountryISOCode: string }): Promise<[PhoneCodeResponse]>;
}
