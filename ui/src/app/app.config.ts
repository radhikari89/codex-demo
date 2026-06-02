import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideRouter(routes),
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      cacheLocation: 'memory',
      authorizationParams: {
        audience: environment.auth0.audience,
        redirect_uri: environment.auth0.redirectUri,
      },
      httpInterceptor: {
        allowedList: ['/api/*'],
      },
    }),
  ],
};
