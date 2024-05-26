// role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as Array<string>;

  if (authService.isLoggedIn && expectedRoles.includes(authService.getUserRole()!)) {
    return true;
  }

  router.navigate(['/dashboard/unauthorized']);
  return false;
};
