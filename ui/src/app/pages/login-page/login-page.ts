import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [true],
  });

  protected submitted = false;
  protected isSubmitting = false;
  protected errorMessage = '';

  protected login(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.authService.login(this.form.controls.email.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        void this.router.navigateByUrl('/dashboard');
      },
      error: (error: unknown) => {
        this.isSubmitting = false;
        this.errorMessage = this.messageFromError(error, 'Unable to log in. Check the email and try again.');
      },
    });
  }

  private messageFromError(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 404) {
        return 'No account exists for that email address.';
      }

      return error.error?.message ?? fallback;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return fallback;
  }
}
