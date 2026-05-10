import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

const STORAGE_KEY = 'codex-demo-user';
const USERS_API_URL = '/api/v1/users';

interface UserResponse {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateUserRequest {
  username: string;
  email: string;
  passwordHash: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userState = signal<AuthUser | null>(this.readStoredUser());

  constructor(private readonly http: HttpClient) {}

  readonly user = this.userState.asReadonly();
  readonly isLoggedIn = computed(() => this.userState() !== null);

  login(email: string): Observable<AuthUser> {
    return this.http.get<UserResponse[]>(USERS_API_URL, { params: { email } }).pipe(
      map((users) => {
        const user = users[0];

        if (!user) {
          throw new Error('No user found for that email address.');
        }

        return this.toAuthUser(user);
      }),
      tap((user) => this.setUser(user)),
    );
  }

  signup(name: string, email: string, password: string): Observable<AuthUser> {
    const request: CreateUserRequest = {
      username: this.usernameFromName(name),
      email,
      passwordHash: password,
    };

    return this.http.post<UserResponse>(USERS_API_URL, request).pipe(
      map((user) => this.toAuthUser(user)),
      tap((user) => this.setUser(user)),
    );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.userState.set(null);
  }

  private setUser(user: AuthUser): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.userState.set(user);
  }

  private readStoredUser(): AuthUser | null {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  private toAuthUser(user: UserResponse): AuthUser {
    return {
      id: user.id,
      name: user.username,
      email: user.email,
    };
  }

  private usernameFromName(name: string): string {
    return name.trim().toLowerCase().replace(/\s+/g, '.');
  }
}
