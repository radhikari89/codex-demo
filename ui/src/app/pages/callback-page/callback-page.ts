import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { filter, take } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-callback-page',
  imports: [RouterLink],
  templateUrl: './callback-page.html',
  styleUrl: '../shared-auth.css',
})
export class CallbackPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly configError = this.authService.configError;

  constructor() {
    this.authService.isLoading$
      .pipe(
        filter((isLoading) => !isLoading),
        take(1),
      )
      .subscribe(() => void this.router.navigateByUrl('/dashboard'));
  }
}
