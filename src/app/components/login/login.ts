import { Component, inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { RedirectRequest } from '@azure/msal-browser';
import { env as env } from '../../../environments/environment.development';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly msalService = inject(MsalService);

  login(): void {
    const request: RedirectRequest = {
      scopes: env.apiConfig.scopes,
    };
    this.msalService.loginRedirect(request);
  }
}
