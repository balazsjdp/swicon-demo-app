import { Injectable } from '@nestjs/common';
import { CountryDetails, CountryListEntry } from '@swicon-country-demo/shared'
import { SoapService } from '../soap/soap.service';
import { CountryInfoSoapClient } from '../soap/types/country-info-soap.client.interface';
import { RawCountryListEntry } from './types/country-list-response.interface';

@Injectable()
export class CountryService {
  private readonly WSDL_URL =
    'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';

  constructor(private readonly soapService: SoapService) {}

  async getCountryList(): Promise<CountryListEntry[]> {
    const client = await this.soapService.getClient<CountryInfoSoapClient>(this.WSDL_URL);
    const [result] = await client.ListOfCountryNamesByNameAsync({});

    const countries = result.ListOfCountryNamesByNameResult.tCountryCodeAndName;

    // Remapping the response to match the CountryListEntry interface to be able to use the same interface with the frontend
    return countries.map((c: RawCountryListEntry) => ({
      name: c.sName,
      code: c.sISOCode,
    }));
  }

  async getCountryDetails(isoCode: string) : Promise<CountryDetails> {
    const client = await this.soapService.getClient<CountryInfoSoapClient>(this.WSDL_URL);

    const [[capitalResult], [currencyResult], [flagResult], [phoneCodeResult]] = await Promise.all([
      client.CapitalCityAsync({ sCountryISOCode: isoCode }),
      client.CountryCurrencyAsync({ sCountryISOCode: isoCode }),
      client.CountryFlagAsync({ sCountryISOCode: isoCode }),
      client.CountryIntPhoneCodeAsync({ sCountryISOCode: isoCode })
    ])

    return {
      capital: capitalResult.CapitalCityResult,
      currency: currencyResult.CountryCurrencyResult.sISOCode,
      flagUrl: flagResult.CountryFlagResult,
      phoneCode: phoneCodeResult.CountryIntPhoneCodeResult,
    };
  }
}
