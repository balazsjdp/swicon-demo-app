// libs/shared/src/lib/models/country-details.model.ts
import { ApiProperty } from '@nestjs/swagger';

export class CountryDetails {
  @ApiProperty()
  capital!: string;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  flagUrl!: string;

  @ApiProperty()
  phoneCode!: number;
}
