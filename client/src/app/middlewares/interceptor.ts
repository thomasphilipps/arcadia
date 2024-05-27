import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const userToken = authService.currentUserValue?.userToken;
  if (userToken) {
    const modifiedReq = req.clone({
      headers: req.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${userToken}`),
    });
    return next(modifiedReq);
  }
  return next(req);
}
