import { Component } from '@angular/core';
import { Firestore, collection, query, where, collectionData } from '@angular/fire/firestore';
import { deleteDoc, doc } from '@angular/fire/firestore';
import { Auth, authState, User } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DashboardComponent {
  userEvents$: Observable<any[]>;

  constructor(private firestore: Firestore, private auth: Auth) {
    this.userEvents$ = authState(this.auth).pipe(
      switchMap((user: User | null) => {
        if (!user) {
          return of([]); // Si aucun utilisateur, retourne un tableau vide
        }

        // Rechercher tous les événements créés par l'utilisateur connecté
        const eventsCollection = collection(this.firestore, 'events');
        const userEventsQuery = query(eventsCollection, where('organizerId', '==', user.uid));
        return collectionData(userEventsQuery, { idField: 'id' });
      })
    );
  }
  async deleteEvent(eventId: string) {
    try {
      const eventDoc = doc(this.firestore, `events/${eventId}`);
      await deleteDoc(eventDoc);
      console.log('Événement supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement :', error);
    }
  }
}
