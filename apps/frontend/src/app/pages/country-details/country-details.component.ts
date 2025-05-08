import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CountryDetailsDto} from "@swicon-country-demo/shared"
import { ActivatedRoute } from '@angular/router';
import CountryService from '../../services/country.service';

@Component({
  selector: 'app-country-details',
  imports: [CommonModule],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss'
})
export class CountryDetailsComponent implements OnInit {
  countryDetails: CountryDetailsDto | null = null;

  constructor(private route: ActivatedRoute, private countryService: CountryService) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.countryService.getCountryDetails(code).subscribe((data) => {
        this.countryDetails = data;
      });
    }
  }
}
