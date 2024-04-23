import { Routes } from '@angular/router';
import { DasboardHomeComponent } from '../components/admin/partials/dasboard-home/dasboard-home.component';

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
    ],
  },
] as Routes;
