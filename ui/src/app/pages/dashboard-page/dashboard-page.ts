import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { hubCategories, hubNavItems } from '../../hub-navigation';
import { UserMenuComponent } from '../../shared/user-menu/user-menu';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, UserMenuComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  protected readonly authService = inject(AuthService);
  protected readonly categories = hubCategories;
  protected readonly navItems = hubNavItems;
}
