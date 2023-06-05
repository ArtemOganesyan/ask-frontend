import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordConfirmationPageComponent } from './forgot-password-confirmation-page.component';

describe('ForgotPasswordConfirmationPageComponent', () => {
  let component: ForgotPasswordConfirmationPageComponent;
  let fixture: ComponentFixture<ForgotPasswordConfirmationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordConfirmationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
