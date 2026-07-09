import { Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';
import { CallbackPage } from './pages/callback-page/callback-page';
import { CategoryPage } from './pages/category-page/category-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { SettingsPage } from './pages/settings-page/settings-page';
import { SignupPage } from './pages/signup-page/signup-page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Web Dev Is Fun' },
  { path: 'login', component: LoginPage, title: 'Login' },
  { path: 'signup', component: SignupPage, title: 'Sign up' },
  { path: 'callback', component: CallbackPage, title: 'Signing in' },
  { path: 'dashboard', component: DashboardPage, canActivate: [authGuard], title: 'Dashboard' },
  { path: 'apps/ai', component: CategoryPage, canActivate: [authGuard], title: 'AI Prototypes' },
  {
    path: 'apps/blockchain',
    component: CategoryPage,
    canActivate: [authGuard],
    title: 'Blockchain Prototypes',
  },
  {
    path: 'apps/security',
    component: CategoryPage,
    canActivate: [authGuard],
    title: 'Security Prototypes',
  },
  { path: 'apps/misc', component: CategoryPage, canActivate: [authGuard], title: 'Misc Apps' },
  { path: 'settings', component: SettingsPage, canActivate: [authGuard], title: 'Settings' },
  { path: '**', redirectTo: '' },
];
