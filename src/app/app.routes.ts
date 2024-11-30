import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventListComponent } from './pages/events/event-list/event-list.component';
import { EventDetailComponent } from './pages/events/event-detail/event-detail.component';
import { EventCreateComponent } from './pages/events/event-create/event-create.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { LoggedInGuard } from './LoggedIn.guard';
import { EventEditComponent } from './pages/events/event-edit/event-edit.component';

export const routes: Routes = [
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'edit-event/:id', component: EventEditComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-event', component: EventCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

