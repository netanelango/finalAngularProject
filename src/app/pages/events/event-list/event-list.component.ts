import { Component } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class EventListComponent {
  events$: Observable<any[]>;

  constructor(private router:Router, private firestore: Firestore) {
    const eventsCollection = collection(this.firestore, 'events');
    this.events$ = collectionData(eventsCollection, { idField: 'id' });
  }
  navigateToDetails(eventId: string) {
    this.router.navigate(['/events', eventId]).then((success) => {
      if (!success) {
        console.error('Navigation échouée');
      }
    });
  }
}
