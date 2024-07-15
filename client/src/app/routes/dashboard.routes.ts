// dashboard.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth.guard';

export default [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        title: 'Connexion | Arcadia admin',
        loadComponent: () =>
          import('@app/components/admin/pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'home',
        title: 'Tableau de bord | Arcadia admin',
        loadComponent: () =>
          import('@components/admin/partials/dasboard-home/dasboard-home.component').then(
            (m) => m.DasboardHomeComponent
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_VETERINARY'] },
      },
      {
        path: 'schedule',
        title: 'Horaires | Arcadia admin',
        loadComponent: () =>
          import('@components/admin/partials/schedule-admin/schedule-admin.component').then(
            (m) => m.ScheduleAdminComponent
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'service',
        title: 'Services | Arcadia admin',
        loadComponent: () =>
          import('@app/components/admin/partials/service-admin/service-admin.component').then(
            (m) => m.ServiceAdminComponent
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] },
      },
      {
        path: 'biome',
        title: 'Biomes | Arcadia admin',
        loadComponent: () =>
          import('@app/components/admin/partials/biome-admin/biome-admin.component').then(
            (m) => m.BiomeAdminComponent
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_VETERINARY'] },
      },
      {
        path: 'specie',
        title: 'Espèces | Arcadia admin',
        loadComponent: () =>
          import('@app/components/admin/partials/specie-admin/specie-admin.component').then(
            (m) => m.SpecieAdminComponent
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'animal',
        title: 'Animaux | Arcadia admin',
        loadComponent: () =>
          import('@app/components/admin/partials/animal-admin/animal-admin.component').then(
            (m) => m.AnimalAdminComponent
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'user',
        title: 'Utilisateurs | Arcadia admin',
        loadComponent: () =>
          import('@app/components/admin/partials/user-admin/user-admin.component').then(
            (m) => m.UserAdminComponent
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'review',
        title: 'Avis | Arcadia admin',
        loadComponent: () =>
          import('@app/components/admin/partials/review-admin/review-admin.component').then(
            (m) => m.ReviewAdminComponent
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] },
      },
      {
        path: 'vet-report',
        title: 'Rapport vétérinaire | Arcadia admin',
        loadComponent: () =>
          import('@app/components/admin/partials/report-admin/report-admin.component').then(
            (m) => m.ReportAdminComponent
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_VETERINARY'] },
      },
      {
        path: 'feeding',
        title: 'Alimentation | Arcadia admin',
        loadComponent: () =>
          import('@app/components/admin/partials/feeding-admin/feeding-admin.component').then(
            (m) => m.FeedingAdminComponent
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_EMPLOYEE'] },
      },
      {
        path: 'unauthorized',
        title: 'Accès interdit | Arcadia admin',
        loadComponent: () =>
          import('@app/components/errors/unauthorized/unauthorized.component').then(
            (m) => m.UnauthorizedComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'unauthorized',
      },
    ],
  },
] as Routes;
