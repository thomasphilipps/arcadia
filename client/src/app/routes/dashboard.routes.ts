import { Routes } from '@angular/router';
import { BiomeAdminComponent } from '@app/components/admin/partials/biome-admin/biome-admin.component';
import { ServiceAdminComponent } from '@app/components/admin/partials/service-admin/service-admin.component';
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
    ],
  },
] as Routes;
