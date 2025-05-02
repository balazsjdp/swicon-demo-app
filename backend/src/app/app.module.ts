import { Module } from '@nestjs/common';
import { CountryService } from './countries/country.service';
import { CountryController } from './countries/country.controller';
import { SoapModule } from './soap/soap.module';

@Module({
  imports: [SoapModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class AppModule {}
