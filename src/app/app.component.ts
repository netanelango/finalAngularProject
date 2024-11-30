import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, CommonModule],
  standalone: true,
})
export class AppComponent {
  isAuthenticated: boolean = false;

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      this.isAuthenticated = !!user;
    });
  }

  async logout() {
    try {
      await signOut(this.auth);
      console.log('Utilisateur déconnecté');
      this.router.navigate(['/login']); // Redirige vers la page de connexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  }
}
