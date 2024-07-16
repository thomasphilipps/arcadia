import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './routes/app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '@environments/environment';
import { AuthInterceptor } from './middlewares/interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const API_URL = new InjectionToken<string>('apiURL');
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    provideAnimations(),
    provideAnimationsAsync(),
    { provide: API_URL, useValue: environment.apiURL },
  ],
};
