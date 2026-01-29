import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'login', 
        loadComponent: () => import('./components/login-form/login-form').then(m => m.LoginForm) },
    { path: '',
        loadComponent: () => import('./components/layout/layout').then(m => m.Layout),
        canActivate: [authGuard],
        children: [
            { path: 'transactions', loadComponent: () => import('./components/transaction-form/transaction-form').then(m => m.TransactionForm) },
            { path: 'categories', loadComponent: () => import('./components/category-form/category-form').then(m => m.CategoryForm) }
        ]
    },
    { path: '**', redirectTo: 'transactions' },
];
