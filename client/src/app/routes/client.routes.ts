import { Routes } from '@angular/router';
import { ContactClientComponent } from '@app/components/frontend/partials/contact-client/contact-client.component';
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
      },*/
      {
        path: 'contact',
        title: 'Contact | Zoo Arcadia',
        component: ContactClientComponent,
      },
    ],
  },
] as Routes;
