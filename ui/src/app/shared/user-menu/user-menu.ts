import { Component, ElementRef, HostListener, inject } from '@angular/core';
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
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected isOpen = false;

  protected get initial(): string {
    return (this.authService.user()?.name || 'U').charAt(0).toUpperCase();
  }

  protected toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  protected closeMenu(): void {
    this.isOpen = false;
  }

  protected logout(): void {
    this.closeMenu();
    this.authService.logout();
  }

  @HostListener('document:click', ['$event.target'])
  protected closeOnOutsideClick(target: EventTarget | null): void {
    if (target instanceof Node && !this.elementRef.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  protected closeOnEscape(): void {
    this.closeMenu();
  }
}
