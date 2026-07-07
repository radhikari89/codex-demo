import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { hubCategories } from '../../hub-navigation';
import { UserMenuComponent } from '../../shared/user-menu/user-menu';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, UserMenuComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  protected readonly authService = inject(AuthService);
  protected readonly categories = hubCategories;
}
