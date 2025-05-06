import { CountryExtensionField } from './country-list-options.interface';

/**
 * Represents the required fields for each country entry.
 * These are always returned regardless of options provided.
 */
interface BaseCountryListEntry {
  code: string;
  name: string;
}

/**
 * Represents a country entry that includes required fields (`code`, `name`)
 * and optionally includes additional fields such as `currency`, `capital`,
 * `flagUrl`, or `phoneCode`, depending on the enrichment options requested.
 *
 * Each of the optional fields is a string if present.
 */
export type CountryListEntry = BaseCountryListEntry &
  Partial<Record<CountryExtensionField, string>>;
