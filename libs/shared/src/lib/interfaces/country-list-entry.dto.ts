import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CountryListEntryDto {
  @ApiProperty({
    description: 'ISO 3166-1 alpha-2 country code (e.g., "US", "DE")',
    type: String,
  })
  code!: string;

  @ApiProperty({
    description: 'Full name of the country (e.g., "United States", "Germany")',
    type: String,
  })
  name!: string;

  @ApiPropertyOptional({
    description: 'Currency used in the country (e.g., "USD", "EUR")',
    type: String,
  })
  currency?: string;

  @ApiPropertyOptional({
    description: 'Capital city of the country (e.g., "Washington D.C.", "Berlin")',
    type: String,
  })
  capital?: string;

  @ApiPropertyOptional({
    description: "URL to the country's flag image",
    type: String,
  })
  flagUrl?: string;

  @ApiPropertyOptional({
    description: 'International dialing code for the country (e.g., "+1", "+49")',
    type: String,
  })
  phoneCode?: string;
}
