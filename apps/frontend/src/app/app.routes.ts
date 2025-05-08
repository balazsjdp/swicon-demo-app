import { Route } from '@angular/router';
import { CountryListComponent } from './pages/country-list/country-list.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';

export const appRoutes: Route[] = [
    { path: '', component: CountryListComponent },
    { path: 'country/:code', component: CountryDetailsComponent },
    { path: '**', redirectTo: '' },
];
