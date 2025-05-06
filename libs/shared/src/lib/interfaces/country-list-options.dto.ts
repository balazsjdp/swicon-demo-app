import { ApiPropertyOptional } from '@nestjs/swagger';

export class CountryListOptionsDto {
  @ApiPropertyOptional({ type: Boolean, description: 'Include currency info' })
  currency?: boolean;

  @ApiPropertyOptional({ type: Boolean, description: 'Include capital info' })
  capital?: boolean;

  @ApiPropertyOptional({ type: Boolean, description: 'Include flag URL' })
  flagUrl?: boolean;

  @ApiPropertyOptional({ type: Boolean, description: 'Include phone code' })
  phoneCode?: boolean;
}
