import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPassingPercentageComponent } from './quiz-passing-percentage.component';

describe('QuizPassingPercentageComponent', () => {
  let component: QuizPassingPercentageComponent;
  let fixture: ComponentFixture<QuizPassingPercentageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizPassingPercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPassingPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
