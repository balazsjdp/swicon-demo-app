import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CountryListEntryDto {
  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  currency?: string;

  @ApiPropertyOptional()
  capital?: string;

  @ApiPropertyOptional()
  flagUrl?: string;

  @ApiPropertyOptional()
  phoneCode?: string;
}
