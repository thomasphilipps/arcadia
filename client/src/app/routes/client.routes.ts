import { Routes } from '@angular/router';
import { HomeClientComponent } from '@app/components/frontend/partials/home-client/home-client.component';

export default [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        title: 'Accueil | Zoo Arcadia',
        component: HomeClientComponent,
      },
    ],
  },
] as Routes;
