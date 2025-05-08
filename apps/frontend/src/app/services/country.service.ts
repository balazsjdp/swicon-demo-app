import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import {CountryListEntryDto} from "@swicon-country-demo/shared"


@Injectable({providedIn: 'root'})
export default class CountryService {
    private countriesCache: CountryListEntryDto[] | null = null;

    constructor(private http: HttpClient) {}
  
    getCountries(): Observable<CountryListEntryDto[]> {
      if (this.countriesCache) {
        // Return cached result as observable
        return of(this.countriesCache);
      }
  
      // Fetch from backend and cache it
      return this.http
        .get<CountryListEntryDto[]>('/api/countries?flagUrl=true')
        .pipe(tap((countries) => (this.countriesCache = countries)));
    }
  
    getCountryDetails(code: string): Observable<any> {
      return this.http.get(`/api/countries/${code}`);
    }
}