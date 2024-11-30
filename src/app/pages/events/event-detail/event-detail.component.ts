import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class EventDetailComponent {
  event$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {
    const eventId = this.route.snapshot.paramMap.get('id'); // Récupération de l'ID
    if (eventId) {
      const eventDoc = doc(this.firestore, `events/${eventId}`);
      this.event$ = docData(eventDoc);
    }  else {
      console.error('Aucun ID trouvé dans l\'URL');
    }
  }
}
