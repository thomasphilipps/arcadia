import { Routes } from '@angular/router';
import { AnimalClientComponent } from '@app/components/frontend/partials/animal-client/animal-client.component';
import { BiomeClientComponent } from '@app/components/frontend/partials/biome-client/biome-client.component';
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
      },
      {
        path: 'biomes',
        title: 'HABITATS | Zoo Arcadia',
        component: BiomeClientComponent,
      },
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
      {
        path: 'animal/:animalId', // Définir la route avec le paramètre animalId
        title: 'Animal | Zoo Arcadia',
        component: AnimalClientComponent,
      },
    ],
  },
] as Routes;
