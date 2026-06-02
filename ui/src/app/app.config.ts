import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { getAppRuntimeConfig } from './app-runtime-config';

const runtimeConfig = getAppRuntimeConfig();
const auth0Config = runtimeConfig.auth0;
const isAuth0Configured = Boolean(auth0Config.domain && auth0Config.clientId);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideRouter(routes),
    provideAuth0({
      domain: auth0Config.domain,
      clientId: auth0Config.clientId,
      cacheLocation: 'memory',
      authorizationParams: {
        audience: auth0Config.audience,
        redirect_uri: auth0Config.redirectUri,
      },
      httpInterceptor: {
        allowedList: isAuth0Configured ? ['/api/*'] : [],
      },
    }),
  ],
};
