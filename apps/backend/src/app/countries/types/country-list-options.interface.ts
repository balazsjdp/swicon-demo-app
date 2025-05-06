/**
 * Represents the names of optional fields that can be included
 * in a country entry when decorating the country list.
 */
export type CountryExtensionField = 'currency' | 'capital' | 'flagUrl' | 'phoneCode';

/**
 * Defines an options object where each optional country field (from CountryExtensionField)
 * can be toggled on or off. If a key is set to `true`, the field will be included in the response.
 *
 * Example:
 *   { currency: true, flagUrl: true }
 *   → Will include currency and flag URL for each country.
 */
export type CountryListOptions = Partial<Record<CountryExtensionField, boolean>>;
