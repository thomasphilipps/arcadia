import { Routes } from '@angular/router';
import { DashboardMainComponent } from '@components/admin/pages/dashboard-main/dashboard-main.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardMainComponent,
    loadChildren: () => import('./dashboard.routes'),
  },
];
