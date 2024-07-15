import { Routes } from '@angular/router';
import { LandingClientComponent } from '@components/frontend/pages/landing-client/landing-client.component';
import { DashboardMainComponent } from '@components/admin/pages/dashboard-main/dashboard-main.component';
import { NotFoundComponent } from '@app/components/errors/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingClientComponent,
    loadChildren: () => import('./client.routes').then((m) => m.default),
  },
  {
    path: 'dashboard',
    component: DashboardMainComponent,
    loadChildren: () => import('./dashboard.routes').then((m) => m.default),
  },
  {
    path: '404',
    title: 'Page introuvable | Zoo Arcadia',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
