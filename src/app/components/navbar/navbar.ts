import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth-service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  get currentRoute(): string {
    return this.router.url;
  }
}
