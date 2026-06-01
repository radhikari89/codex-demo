import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth0 = inject(Auth0Service);
  private readonly auth0User = toSignal(this.auth0.user$, { initialValue: null });

  readonly isLoading$ = this.auth0.isLoading$;
  readonly isAuthenticated$ = this.auth0.isAuthenticated$;
  readonly isConfigured = Boolean(environment.auth0.domain && environment.auth0.clientId);
  readonly configError = signal(
    this.isConfigured ? '' : 'Auth0 is not configured for this environment yet.',
  );

  readonly user = computed<AuthUser | null>(() => this.toAuthUser(this.auth0User()));
  readonly isLoggedIn = computed(() => this.user() !== null);

  login(target = '/dashboard'): Observable<void> | null {
    if (!this.isConfigured) {
      this.configError.set('Auth0 domain and client ID must be configured before login can start.');
      return null;
    }

    this.configError.set('');
    return this.auth0.loginWithRedirect({
      appState: { target },
    });
  }

  signup(target = '/dashboard'): Observable<void> | null {
    if (!this.isConfigured) {
      this.configError.set('Auth0 domain and client ID must be configured before signup can start.');
      return null;
    }

    this.configError.set('');
    return this.auth0.loginWithRedirect({
      appState: { target },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }

  logout(): void {
    this.auth0
      .logout({
        logoutParams: {
          returnTo: environment.auth0.logoutReturnTo,
        },
      })
      .subscribe();
  }

  private toAuthUser(user: User | null | undefined): AuthUser | null {
    if (!user) {
      return null;
    }

    return {
      id: user.sub ?? user.email ?? '',
      name: user.name ?? user.nickname ?? user.email ?? 'Signed-in user',
      email: user.email ?? '',
    };
  }
}
