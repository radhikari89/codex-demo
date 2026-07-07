import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-menu',
  imports: [RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenuComponent {
  protected readonly authService = inject(AuthService);

  protected get initial(): string {
    return (this.authService.user()?.name || 'U').charAt(0).toUpperCase();
  }

  protected logout(): void {
    this.authService.logout();
  }
}
