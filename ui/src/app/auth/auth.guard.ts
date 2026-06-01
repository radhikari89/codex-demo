import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { combineLatest, filter, map, take } from 'rxjs';

import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return combineLatest([authService.isLoading$, authService.isAuthenticated$]).pipe(
    filter(([isLoading]) => !isLoading),
    take(1),
    map(([, isAuthenticated]) => isAuthenticated || router.createUrlTree(['/login'])),
  );
};
