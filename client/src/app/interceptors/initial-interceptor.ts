import { HttpInterceptorFn } from '@angular/common/http';
import { AppEnvService } from '../services/app-env';
import { inject } from '@angular/core';

export const initialInterceptor: HttpInterceptorFn = (req, next) => {
    const env = inject(AppEnvService);
    
    if (!req.url.startsWith('http')) {
      {
        const modifiedReq = req.clone({
          url: `${env.apiBaseUrl}${req.url}`,
        });
        return next(modifiedReq);
      }
    } else {
      return next(req);
    }
};
