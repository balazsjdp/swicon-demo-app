import { Module } from '@nestjs/common';
import { CountryService } from './countries/country.service';
import { CountryController } from './countries/country.controller';
import { SoapModule } from './soap/soap.module';
import { CacheService } from './shared/cache/cache.service';

@Module({
  imports: [SoapModule],
  controllers: [CountryController],
  providers: [CountryService, CacheService],
})
export class AppModule {}
