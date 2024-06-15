import { Routes } from '@angular/router';

import { LandingClientComponent } from '@components/frontend/pages/landing-client/landing-client.component';
import { DashboardMainComponent } from '@components/admin/pages/dashboard-main/dashboard-main.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingClientComponent,
    loadChildren: () => import('./client.routes'),
  },
  {
    path: 'dashboard',
    component: DashboardMainComponent,
    loadChildren: () => import('./dashboard.routes'),
  },
];
