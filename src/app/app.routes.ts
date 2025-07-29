import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "", loadComponent: () => import('./core/layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent), children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent) },
            { path: 'register', loadComponent: () => import('./core/auth//register/register.component').then(m => m.RegisterComponent) },
            { path: 'forgetPassword', loadComponent: () => import('./features/pages/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) },
        ]
    },
    {
        path: "", loadComponent: () => import('./core/layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent), children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadComponent: () => import('./features/pages/home/home.component').then(m => m.HomeComponent) },

        ]
    },
    { path: '**', loadComponent: () => import('./features/pages/notfound/notfound.component').then(m => m.NotfoundComponent) }
];
