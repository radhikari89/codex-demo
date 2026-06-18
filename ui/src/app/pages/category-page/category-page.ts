import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { HubCategory, hubCategories, hubNavItems } from '../../hub-navigation';

@Component({
  selector: 'app-category-page',
  imports: [RouterLink],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
})
export class CategoryPage {
  private readonly router = inject(Router);
  protected readonly authService = inject(AuthService);
  protected readonly navItems = hubNavItems;
  protected readonly category = computed(() => this.categoryFromUrl());

  protected logout(): void {
    this.authService.logout();
  }

  private categoryFromUrl(): HubCategory {
    const currentPath = this.router.url.split('?')[0];
    return hubCategories.find((category) => category.route === currentPath) ?? hubCategories[0];
  }
}
