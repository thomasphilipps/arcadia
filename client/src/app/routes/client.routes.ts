import { Routes } from '@angular/router';

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
        loadComponent: () =>
          import('@app/components/frontend/partials/home-client/home-client.component').then(
            (m) => m.HomeClientComponent
          ),
      },
      {
        path: 'services',
        title: 'Services | Zoo Arcadia',
        loadComponent: () =>
          import('@app/components/frontend/partials/service-client/service-client.component').then(
            (m) => m.ServiceClientComponent
          ),
      },
      {
        path: 'biomes',
        title: 'HABITATS | Zoo Arcadia',
        loadComponent: () =>
          import('@app/components/frontend/partials/biome-client/biome-client.component').then(
            (m) => m.BiomeClientComponent
          ),
      },
      {
        path: 'contact',
        title: 'Contact | Zoo Arcadia',
        loadComponent: () =>
          import('@app/components/frontend/partials/contact-client/contact-client.component').then(
            (m) => m.ContactClientComponent
          ),
      },
      {
        path: 'cgu',
        title: 'CGU | Zoo Arcadia',
        loadComponent: () =>
          import('@app/components/frontend/partials/cgu/cgu.component').then((m) => m.CguComponent),
      },
      {
        path: 'animal/:animalId',
        title: 'Animal | Zoo Arcadia',
        loadComponent: () =>
          import('@app/components/frontend/partials/animal-client/animal-client.component').then(
            (m) => m.AnimalClientComponent
          ),
      },
    ],
  },
] as Routes;
