import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './routes/app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '@environments/environment.development';
import { AuthInterceptor } from './middlewares/interceptor';
export const API_URL = new InjectionToken<string>('apiURL');
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    provideAnimationsAsync(),
    { provide: API_URL, useValue: environment.apiURL },
  ],
};
