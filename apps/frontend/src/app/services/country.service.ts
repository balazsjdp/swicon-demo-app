import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { CountryDetailsDto, CountryListEntryDto } from '@swicon-country-demo/shared';

/**
 * Service responsible for interacting with the country-related API endpoints.
 * Caches country list responses to reduce redundant HTTP requests.
 */
@Injectable({ providedIn: 'root' })
export default class CountryService {
  /**
   * In-memory cache of country list results.
   * Prevents redundant API calls within the session.
   */
  private countriesCache: CountryListEntryDto[] | null = null;

  /**
   * Angular HttpClient instance used for HTTP requests.
   * Injected using Angular's functional DI style.
   */
  private readonly _http: HttpClient = inject(HttpClient);
  /**
   * Retrieves the list of countries with flags from the backend.
   * If the list is already cached, returns it immediately as an observable.
   *
   * @returns {CountryListEntryDto[]} An observable emitting an array of `CountryListEntryDto`.
   */
  getCountries(): Observable<CountryListEntryDto[]> {
    if (this.countriesCache) {
      // Return cached result as observable
      return of(this.countriesCache);
    }

    // Fetch from backend and cache it
    return this._http
      .get<CountryListEntryDto[]>('/api/countries?flagUrl=true')
      .pipe(tap((countries) => (this.countriesCache = countries)));
  }
  /**
   * Retrieves detailed information for a specific country by its ISO code.
   *
   * @param code - The ISO code of the country (e.g., "HU", "FR", "US").
   * @returns {CountryDetailsDto} An observable emitting detailed country information.
   */
  getCountryDetails(code: string): Observable<CountryDetailsDto> {
    return this._http.get<CountryDetailsDto>(`/api/countries/${code}`);
  }
}
