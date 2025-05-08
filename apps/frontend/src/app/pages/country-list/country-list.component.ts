import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CountryListEntryDto} from "@swicon-country-demo/shared"
import CountryService from '../../services/country.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent implements OnInit {
  countries: CountryListEntryDto[] = [];

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  navigateToDetails(code: string): void {
    this.router.navigate(['/country', code]);
  }
}
