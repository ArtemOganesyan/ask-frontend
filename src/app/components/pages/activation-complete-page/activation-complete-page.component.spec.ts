import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationCompletePageComponent } from './activation-complete-page.component';

describe('ActivationCompletePageComponent', () => {
  let component: ActivationCompletePageComponent;
  let fixture: ComponentFixture<ActivationCompletePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationCompletePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationCompletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
