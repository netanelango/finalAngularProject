import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // Ajouter CommonModule ici
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string | null = null;
  loading: boolean = false;

  constructor(private auth: Auth, private router: Router, private route: ActivatedRoute) {}

  async login() {
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      const redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl') || '/dashboard';
      this.router.navigate([redirectUrl]); // Redirige vers la dernière page visitée ou le tableau de bord
    } catch (error: any) {
      console.error('Erreur de connexion :', error.message);
      this.error = 'Connexion échouée. Vérifiez vos informations.';
    }
  }
  

  goToRegister() {
    this.router.navigate(['/register']);
  }
  
}
