import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/Auth-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.includes('/login')) {
    return next(req);
  }
  const authService = inject(AuthService);

  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }
  return next(req);
};
