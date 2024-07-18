import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const userToken = authService.currentUserValue?.userToken;

  if (userToken) {
    let headers = req.headers.set('Authorization', `Bearer ${userToken}`);

    // Vérifiez si la requête est multipart/form-data pour éviter une erreur de payload
    if (!(req.body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    const modifiedReq = req.clone({ headers });
    return next(modifiedReq);
  }

  return next(req);
}
