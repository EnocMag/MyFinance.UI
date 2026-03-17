import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
    { path: 'login', 
        loadComponent: () => import('./components/login/login').then(m => m.Login) },
        { path: '',
            loadComponent: () => import('./components/layout/layout').then(m => m.Layout),
            canActivate: [MsalGuard],
            children: [
                { path: 'transactions', loadComponent: () => import('./components/transaction-form/transaction-form').then(m => m.TransactionForm) },
                { path: 'categories', loadComponent: () => import('./components/category-form/category-form').then(m => m.CategoryForm) },
                { path: 'reports', loadComponent: () => import('./components/transaction-reports/transaction-reports').then(m => m.TransactionReports) },
                { path: 'chart', loadComponent: () => import('./components/report-chart/report-chart').then(m => m.ReportChart) }
        ]
    },
    { path: '**', redirectTo: 'transactions' },
];
