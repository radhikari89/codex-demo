import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { hubNavItems } from '../../hub-navigation';
import { UserMenuComponent } from '../../shared/user-menu/user-menu';

@Component({
  selector: 'app-settings-page',
  imports: [RouterLink, UserMenuComponent],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css',
})
export class SettingsPage {
  protected readonly authService = inject(AuthService);
  protected readonly navItems = hubNavItems;
}
