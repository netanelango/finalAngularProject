import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from '../app/pages/login/login.component';

describe('LoginComponent', () => {
  let mockAuth: Partial<AngularFireAuth>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuth = {
      signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve()),
      createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(Promise.resolve()),
      authState: of(null),
    };

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: AngularFireAuth, useValue: mockAuth },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call login method', async () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;

    component.email = 'test@example.com';
    component.password = 'password123';
    await component.login();

    expect(mockAuth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call register method', async () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;

    component.email = 'newuser@example.com';
    component.password = 'password123';
    await component.register();

    expect(mockAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith('newuser@example.com', 'password123');
  });
});
