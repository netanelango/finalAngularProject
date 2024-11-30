import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule], // Ajouter CommonModule ici
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string | null = null;
  loading: boolean = false;

  constructor(private auth: Auth, private router: Router) {}

  async register() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }
  
    this.loading = true;
    this.error = null;
  
    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('Utilisateur inscrit');
      // Redirige l'utilisateur vers le tableau de bord après l'inscription
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Erreur d\'inscription :', error.message);
      this.error = 'Inscription échouée. Veuillez réessayer.';
    } finally {
      this.loading = false;
    }
  }
  
}