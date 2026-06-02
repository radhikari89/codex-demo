import { Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';
import { CallbackPage } from './pages/callback-page/callback-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { SignupPage } from './pages/signup-page/signup-page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Home' },
  { path: 'login', component: LoginPage, title: 'Login' },
  { path: 'signup', component: SignupPage, title: 'Sign up' },
  { path: 'callback', component: CallbackPage, title: 'Signing in' },
  { path: 'dashboard', component: DashboardPage, canActivate: [authGuard], title: 'Dashboard' },
  { path: '**', redirectTo: '' },
];
