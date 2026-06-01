import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signup-page',
  imports: [RouterLink],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
})
export class SignupPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected isSubmitting = false;
  protected readonly configError = this.authService.configError;

  protected signup(): void {
    const signup$ = this.authService.signup('/dashboard');
    if (!signup$) {
      return;
    }
    this.isSubmitting = true;

    signup$.subscribe({
      next: () => void this.router.navigateByUrl('/dashboard'),
      error: (error: unknown) => {
        this.isSubmitting = false;
        this.authService.configError.set(this.messageFromError(error, 'Unable to start Auth0 signup.'));
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
