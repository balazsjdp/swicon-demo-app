import { ApiProperty } from '@nestjs/swagger';

export class CountryDetailsDto {
  @ApiProperty()
  capital!: string;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  flagUrl!: string;

  @ApiProperty()
  phoneCode!: number;
}
