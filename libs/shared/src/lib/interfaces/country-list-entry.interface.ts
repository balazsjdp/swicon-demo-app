import { ApiProperty } from '@nestjs/swagger';

export class CountryListEntry {
  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;
}
