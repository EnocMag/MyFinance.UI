import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./components/login-form/login-form').then(m => m.LoginForm) },
    { path: 'transactions', loadComponent: () => import('./components/transaction-form/transaction-form').then(m => m.TransactionForm),
        canActivate: [authGuard]
    },
];
