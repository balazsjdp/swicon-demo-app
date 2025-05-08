import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryListEntryDto } from '@swicon-country-demo/shared';
import CountryService from '../../services/country.service';
import { RouterModule } from '@angular/router';
import { CountryCardComponent } from '../../components/country-card/country-card.component';

@Component({
  selector: 'app-country-list',
  imports: [CommonModule, RouterModule, CountryCardComponent],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
})
export class CountryListComponent implements OnInit {
  private readonly _countryService: CountryService = inject(CountryService);

  countries: CountryListEntryDto[] = [];
  isLoading = signal(true);

  ngOnInit(): void {
    this._countryService.getCountries().subscribe((data) => {
      this.countries = data;
      this.isLoading.set(false);
    });
  }
}
