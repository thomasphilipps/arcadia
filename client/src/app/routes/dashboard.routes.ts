import { Routes } from '@angular/router';
import { AnimalAdminComponent } from '@app/components/admin/partials/animal-admin/animal-admin.component';
import { BiomeAdminComponent } from '@app/components/admin/partials/biome-admin/biome-admin.component';
import { ServiceAdminComponent } from '@app/components/admin/partials/service-admin/service-admin.component';
import { SpecieAdminComponent } from '@app/components/admin/partials/specie-admin/specie-admin.component';
import { UserAdminComponent } from '@app/components/admin/partials/user-admin/user-admin.component';
import { DasboardHomeComponent } from '@components/admin/partials/dasboard-home/dasboard-home.component';
import { ScheduleAdminComponent } from '@components/admin/partials/schedule-admin/schedule-admin.component';

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
        title: 'Tableau de bord | Arcadia admin',
        component: DasboardHomeComponent,
      },
      {
        path: 'schedule',
        title: 'Horaires | Arcadia admin',
        component: ScheduleAdminComponent,
      },
      {
        path: 'service',
        title: 'Services | Arcadia admin',
        component: ServiceAdminComponent,
      },
      {
        path: 'biome',
        title: 'Biomes | Arcadia admin',
        component: BiomeAdminComponent,
      },
      {
        path: 'specie',
        title: 'Espèces | Arcadia admin',
        component: SpecieAdminComponent,
      },
      {
        path: 'animal',
        title: 'Animaux | Arcadia admin',
        component: AnimalAdminComponent,
      },
      {
        path: 'user',
        title: 'Utilisateurs | Arcadia admin',
        component: UserAdminComponent,
      },
    ],
  },
] as Routes;
