import { Injectable } from '@angular/core';
import { env } from '../../environments/environment';
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root',
})

export class MsalAuthService {
  msalInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication({
      auth: env.msalConfig.auth,
      cache: {
        cacheLocation: BrowserCacheLocation.SessionStorage,
      },
    });
  }
  msalGuardConfigFactory(): MsalGuardConfiguration {
    return {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: env.apiConfig.scopes,
      },
      loginFailedRoute: '/login',
    }
  }
  logout(): void {
    const msalInstance = this.msalInstanceFactory();
    msalInstance.logoutRedirect();
  }
  msalInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string>>();

    protectedResourceMap.set(
      env.myFinanceApiUrl + '*',
      env.apiConfig.scopes
    );

    return {
      interactionType: InteractionType.Redirect,
      protectedResourceMap,
    };
  }
}
