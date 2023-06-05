import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSingleChoiceQuestionComponent } from './quiz-single-choice-question.component';

describe('QuizSingleChoiceQuestionComponent', () => {
  let component: QuizSingleChoiceQuestionComponent;
  let fixture: ComponentFixture<QuizSingleChoiceQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSingleChoiceQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSingleChoiceQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
