export interface CountryListResponse {
  ListOfCountryNamesByNameResult: {
    tCountryCodeAndName: RawCountryListEntry[];
  };
}

export interface RawCountryListEntry {
  sISOCode: string;
  sName: string;
}
