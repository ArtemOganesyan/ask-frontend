import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordConfirmationPageComponent } from './reset-password-confirmation-page.component';

describe('ResetPasswordConfirmationPageComponent', () => {
  let component: ResetPasswordConfirmationPageComponent;
  let fixture: ComponentFixture<ResetPasswordConfirmationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordConfirmationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
