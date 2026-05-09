import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signup-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
})
export class SignupPage {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected isSubmitting = false;
  protected errorMessage = '';

  protected signup(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.authService
      .signup(
        this.form.controls.name.value,
        this.form.controls.email.value,
        this.form.controls.password.value,
      )
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          void this.router.navigateByUrl('/dashboard');
        },
        error: (error: unknown) => {
          this.isSubmitting = false;
          this.errorMessage = this.messageFromError(error, 'Unable to create account. Try again.');
        },
      });
  }

  private messageFromError(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 409) {
        return 'An account with that username or email already exists.';
      }

      return error.error?.message ?? fallback;
    }

    return fallback;
  }
}
