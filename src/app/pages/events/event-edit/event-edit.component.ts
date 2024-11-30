import { Component } from '@angular/core';
import { Firestore, doc, updateDoc, docData } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss'],
  imports : [CommonModule, FormsModule],
  standalone: true,
})
export class EventEditComponent {
  event$: Observable<any> = EMPTY;
  title: string = '';
  description: string = '';
  date: string = '';
  location: string = '';

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      const eventDoc = doc(this.firestore, `events/${eventId}`);
      this.event$ = docData(eventDoc);

      this.event$.subscribe((event) => {
        this.title = event.title;
        this.description = event.description;
        this.date = event.date;
        this.location = event.location;
      });
    }
  }

  async saveChanges() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      const eventDoc = doc(this.firestore, `events/${eventId}`);
      try {
        await updateDoc(eventDoc, {
          title: this.title,
          description: this.description,
          date: this.date,
          location: this.location,
        });
        console.log('Événement mis à jour');
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'événement :', error);
      }
    }
  }
}
