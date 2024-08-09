import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

    if(!auth.checkLogin()) {
        router.navigateByUrl('/login');

        return false;
    }
    return true;
};
