import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryDetailsDto } from '@swicon-country-demo/shared';
import { ActivatedRoute, RouterModule } from '@angular/router';
import CountryService from '../../services/country.service';

@Component({
  selector: 'app-country-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
})
export class CountryDetailsComponent implements OnInit {
  private readonly _countryService: CountryService = inject(CountryService);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);

  countryDetails: CountryDetailsDto | null = null;

  ngOnInit(): void {
    const code = this._route.snapshot.paramMap.get('code');
    if (code) {
      this._countryService.getCountryDetails(code).subscribe((data) => {
        this.countryDetails = data;
      });
    }
  }
}
