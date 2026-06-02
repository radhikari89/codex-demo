import { Injectable, Injector, Signal, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';

import { getAppRuntimeConfig } from '../app-runtime-config';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth0Config = getAppRuntimeConfig().auth0;
  private readonly injector = inject(Injector);

  readonly isConfigured = Boolean(this.auth0Config.domain && this.auth0Config.clientId);

  private readonly auth0 = this.isConfigured ? this.injector.get(Auth0Service) : null;
  private readonly auth0User: Signal<User | null | undefined> = this.auth0
    ? toSignal(this.auth0.user$, { initialValue: null })
    : signal(null);

  readonly isLoading$ = this.auth0?.isLoading$ ?? of(false);
  readonly isAuthenticated$ = this.auth0?.isAuthenticated$ ?? of(false);
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
    return this.auth0?.loginWithRedirect({
      appState: { target },
    }) ?? null;
  }

  signup(target = '/dashboard'): Observable<void> | null {
    if (!this.isConfigured) {
      this.configError.set('Auth0 domain and client ID must be configured before signup can start.');
      return null;
    }

    this.configError.set('');
    return this.auth0?.loginWithRedirect({
      appState: { target },
      authorizationParams: {
        screen_hint: 'signup',
      },
    }) ?? null;
  }

  logout(): void {
    this.auth0
      ?.logout({
        logoutParams: {
          returnTo: this.auth0Config.logoutReturnTo,
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
