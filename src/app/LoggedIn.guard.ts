import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          this.router.navigate(['/dashboard']); // Redirige si l'utilisateur est déjà connecté
          observer.next(false);
          observer.complete();
        } else {
          observer.next(true);
          observer.complete();
        }
      });
    });
  }
}
