import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBodyFormComponent } from './question-body-form.component';

describe('QuestionBodyFormComponent', () => {
  let component: QuestionBodyFormComponent;
  let fixture: ComponentFixture<QuestionBodyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionBodyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionBodyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
