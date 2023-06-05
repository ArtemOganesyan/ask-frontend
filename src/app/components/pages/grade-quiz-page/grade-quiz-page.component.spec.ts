import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeQuizPageComponent } from './grade-quiz-page.component';

describe('GradeQuizPageComponent', () => {
  let component: GradeQuizPageComponent;
  let fixture: ComponentFixture<GradeQuizPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeQuizPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
