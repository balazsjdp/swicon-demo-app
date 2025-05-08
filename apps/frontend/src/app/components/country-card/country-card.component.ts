import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryListEntryDto } from '@swicon-country-demo/shared';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './country-card.component.html',
})
export class CountryCardComponent {
  @Input() country?: CountryListEntryDto | null = null;
}
