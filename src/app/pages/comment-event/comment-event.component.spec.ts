import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentEventComponent } from './comment-event.component';

describe('CommentEventComponent', () => {
  let component: CommentEventComponent;
  let fixture: ComponentFixture<CommentEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
