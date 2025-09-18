import { Routes } from '@angular/router';
import { logedGuard } from './core/guards/loged.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: "", loadComponent: () => import('./core/layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),canActivate:[logedGuard], children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent) },
            { path: 'register', loadComponent: () => import('./core/auth//register/register.component').then(m => m.RegisterComponent) },
            { path: 'forgetPassword', loadComponent: () => import('./features/pages/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) },
        ]
    },
    {
        path: "", loadComponent: () => import('./core/layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),canActivate:[authGuard], children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadComponent: () => import('./features/pages/dash-board/dash-board.component').then(m => m.DashBoardComponent) },
            { path: 'quizhistory', loadComponent: () => import('./features/pages/quiz-history/quiz-history.component').then(m => m.QuizHistoryComponent) },
            { path: 'exams', loadComponent: () => import('./features/pages/exams/exams.component').then(m => m.ExamsComponent) },

        ]
    },
    { path: '**', loadComponent: () => import('./features/pages/notfound/notfound.component').then(m => m.NotfoundComponent) }
];
