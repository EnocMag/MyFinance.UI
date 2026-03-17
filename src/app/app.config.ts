import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalInterceptor, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication } from '@azure/msal-browser';
import { MsalAuthService } from './services/msal-auth-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: MSAL_INSTANCE,
      useFactory: (authService: MsalAuthService) => authService.msalInstanceFactory(),
      deps: [MsalAuthService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (msalInstance: IPublicClientApplication) => () => msalInstance.initialize(),
      deps: [MSAL_INSTANCE],
      multi: true,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: (authService: MsalAuthService) => authService.msalGuardConfigFactory(),
      deps: [MsalAuthService],
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: (authService: MsalAuthService) => authService.msalInterceptorConfigFactory(),
      deps: [MsalAuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ]
};
