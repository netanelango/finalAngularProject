import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class EventCreateComponent {
  title: string = '';
  description: string = '';
  date: string = '';
  location: string = '';
  isPublic: boolean = false;

  constructor(
    private firestore: Firestore,
    private auth: Auth, // Injection du service Auth
    private router: Router
  ) {}

  async createEvent() {
    const userId = this.auth.currentUser?.uid; // Vérifiez que `auth` est correctement injecté
    if (!userId) {
      console.error('Utilisateur non connecté.');
      this.router.navigate(['/login']);
      return;
    }

    try {
      const eventsCollection = collection(this.firestore, 'events');
      await addDoc(eventsCollection, {
        title: this.title,
        description: this.description,
        date: this.date,
        location: this.location,
        isPublic: this.isPublic,
        organizerId: userId,
      });
      console.log('Événement créé avec succès');
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement :', error);
    }
  }
}