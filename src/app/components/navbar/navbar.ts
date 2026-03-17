import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MsalAuthService } from '../../services/msal-auth-service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    private router: Router,
  ) {}

  private AuthService = Inject(MsalAuthService);

  navigate(route: string) {
    this.router.navigate([route]);
  }
  logout() {
    this.AuthService.logout();
    this.router.navigate(['/login']);
  }
  get currentRoute(): string {
    return this.router.url;
  }
}
