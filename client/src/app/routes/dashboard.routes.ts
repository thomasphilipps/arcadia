import { Routes } from '@angular/router';
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
        title: 'Arcadia - Tableau de bord',
        component: DasboardHomeComponent,
      },
      {
        path: 'schedule',
        title: 'Arcadia - Horaires',
        component: ScheduleAdminComponent,
      },
    ],
  },
] as Routes;
