import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordCompletePageComponent } from './reset-password-complete-page.component';

describe('ResetPasswordCompletePageComponent', () => {
  let component: ResetPasswordCompletePageComponent;
  let fixture: ComponentFixture<ResetPasswordCompletePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordCompletePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordCompletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
