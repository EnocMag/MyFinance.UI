import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/Auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {

  loginForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
    ) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  async onSubmit() {

    const credentials = this.loginForm.value;

    const authResponse = await this.authService.login(credentials.username, credentials.password);
    if (authResponse) {
      this.router.navigate(['/transactions']);
    }
  }
}
