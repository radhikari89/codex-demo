import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { HubCategory, hubCategories, hubNavItems } from '../../hub-navigation';
import { UserMenuComponent } from '../../shared/user-menu/user-menu';

@Component({
  selector: 'app-category-page',
  imports: [RouterLink, UserMenuComponent],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
})
export class CategoryPage {
  private readonly router = inject(Router);
  protected readonly navItems = hubNavItems;
  protected readonly category = computed(() => this.categoryFromUrl());

  private categoryFromUrl(): HubCategory {
    const currentPath = this.router.url.split('?')[0];
    return hubCategories.find((category) => category.route === currentPath) ?? hubCategories[0];
  }
}
