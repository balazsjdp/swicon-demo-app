import { ApiProperty } from '@nestjs/swagger';

export class CountryDetailsDto {
  @ApiProperty({
    description: 'ISO 3166-1 alpha-2 country code (e.g., "US", "DE")',
    type: String,
  })
  code!: string;

  @ApiProperty({
    type: String,
    description: 'Official currency used in the country (e.g., "EUR", "CAD")',
  })
  currency!: string;

  @ApiProperty({
    type: String,
    description: 'Capital city of the country (e.g., "Paris", "Ottawa")',
  })
  capital!: string;

  @ApiProperty({
    type: String,
    description: "URL to the country's flag image",
  })
  flagUrl!: string;

  @ApiProperty({
    type: Number,
    description: 'International dialing code of the country (e.g., 33, 1)',
  })
  phoneCode!: number;
}
