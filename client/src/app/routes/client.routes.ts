import { Routes } from '@angular/router';
import { CguComponent } from '@app/components/frontend/partials/cgu/cgu.component';
import { ContactClientComponent } from '@app/components/frontend/partials/contact-client/contact-client.component';
import { HomeClientComponent } from '@app/components/frontend/partials/home-client/home-client.component';
import { ServiceClientComponent } from '@app/components/frontend/partials/service-client/service-client.component';

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
      {
        path: 'services',
        title: 'Services | Zoo Arcadia',
        component: ServiceClientComponent,
      } /* 
      {
        path: 'biomes',
      },*/,
      {
        path: 'contact',
        title: 'Contact | Zoo Arcadia',
        component: ContactClientComponent,
      },
      {
        path: 'cgu',
        title: 'CGU | Zoo Arcadia',
        component: CguComponent,
      },
    ],
  },
] as Routes;
