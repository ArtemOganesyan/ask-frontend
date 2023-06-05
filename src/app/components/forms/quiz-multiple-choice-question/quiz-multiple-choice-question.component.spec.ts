import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMultipleChoiceQuestionComponent } from './quiz-multiple-choice-question.component';

describe('QuizMultipleChoiceQuestionComponent', () => {
  let component: QuizMultipleChoiceQuestionComponent;
  let fixture: ComponentFixture<QuizMultipleChoiceQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizMultipleChoiceQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizMultipleChoiceQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
