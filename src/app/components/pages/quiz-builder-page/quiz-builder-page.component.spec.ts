import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizBuilderPageComponent } from './quiz-builder-page.component';

describe('QuizBuilderPageComponent', () => {
  let component: QuizBuilderPageComponent;
  let fixture: ComponentFixture<QuizBuilderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizBuilderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizBuilderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
