import { Routes } from '@angular/router';
import { LoginComponent } from '@app/components/admin/pages/login/login.component';
import { AnimalAdminComponent } from '@app/components/admin/partials/animal-admin/animal-admin.component';
import { BiomeAdminComponent } from '@app/components/admin/partials/biome-admin/biome-admin.component';
import { ReportAdminComponent } from '@app/components/admin/partials/report-admin/report-admin.component';
import { ReviewAdminComponent } from '@app/components/admin/partials/review-admin/review-admin.component';
import { ServiceAdminComponent } from '@app/components/admin/partials/service-admin/service-admin.component';
import { SpecieAdminComponent } from '@app/components/admin/partials/specie-admin/specie-admin.component';
import { UserAdminComponent } from '@app/components/admin/partials/user-admin/user-admin.component';
import { UnauthorizedComponent } from '@app/components/errors/unauthorized/unauthorized.component';
import { AuthGuard } from '@app/guards/auth.guard';
import { DasboardHomeComponent } from '@components/admin/partials/dasboard-home/dasboard-home.component';
import { ScheduleAdminComponent } from '@components/admin/partials/schedule-admin/schedule-admin.component';

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
        component: LoginComponent,
      },
      {
        path: 'home',
        title: 'Tableau de bord | Arcadia admin',
        component: DasboardHomeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_VETERINARY'] },
      },
      {
        path: 'schedule',
        title: 'Horaires | Arcadia admin',
        component: ScheduleAdminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'service',
        title: 'Services | Arcadia admin',
        component: ServiceAdminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] },
      },
      {
        path: 'biome',
        title: 'Biomes | Arcadia admin',
        component: BiomeAdminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_VETERINARY'] },
      },
      {
        path: 'specie',
        title: 'Espèces | Arcadia admin',
        component: SpecieAdminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'animal',
        title: 'Animaux | Arcadia admin',
        component: AnimalAdminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'user',
        title: 'Utilisateurs | Arcadia admin',
        component: UserAdminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'review',
        title: 'Avis | Arcadia admin',
        component: ReviewAdminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] },
      },
      {
        path: 'vet-report',
        title: 'Rapport vétérinaire | Arcadia admin',
        component: ReportAdminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_VETERINARY'] },
      },
      {
        path: 'unauthorized',
        title: 'Accès interdit | Arcadia admin',
        component: UnauthorizedComponent,
      },
      {
        path: '**',
        redirectTo: 'unauthorized',
      },
    ],
  },
] as Routes;
