import { ApiPropertyOptional } from '@nestjs/swagger';

export class CountryListOptionsDto {
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Include currency info in the response',
  })
  currency?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Include capital info in the response',
  })
  capital?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Include flag URL in the response',
  })
  flagUrl?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Include phone code in the response',
  })
  phoneCode?: boolean;
}
