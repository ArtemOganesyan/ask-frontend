import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTextualQuestionComponent } from './quiz-textual-question.component';

describe('QuizTextualQuestionComponent', () => {
  let component: QuizTextualQuestionComponent;
  let fixture: ComponentFixture<QuizTextualQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizTextualQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizTextualQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
