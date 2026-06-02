import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected isSubmitting = false;
  protected readonly configError = this.authService.configError;

  protected login(): void {
    const login$ = this.authService.login('/dashboard');
    if (!login$) {
      return;
    }
    this.isSubmitting = true;

    login$.subscribe({
      next: () => void this.router.navigateByUrl('/dashboard'),
      error: (error: unknown) => {
        this.isSubmitting = false;
        this.authService.configError.set(this.messageFromError(error, 'Unable to start Auth0 login.'));
      },
    });
  }

  private messageFromError(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message;
    }

    return fallback;
  }
}
