import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTakeQuizComponent } from './student-take-quiz.component';

describe('StudentTakeQuizComponent', () => {
  let component: StudentTakeQuizComponent;
  let fixture: ComponentFixture<StudentTakeQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTakeQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTakeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
