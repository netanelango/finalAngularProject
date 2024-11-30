import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          observer.next(true);
          observer.complete();
        } else {
          const redirectUrl = route.url.map((segment) => segment.path).join('/');
          this.router.navigate(['/login'], { queryParams: { redirectUrl } });
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
