import { Routes } from '@angular/router';
import { NotFoundComponent } from '@app/components/errors/not-found/not-found.component';
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
      /* {
        path: 'services',
      },
      {
        path: 'biomes',
      },
      {
        path: 'contact',
      }, */
    ],
  },
] as Routes;
