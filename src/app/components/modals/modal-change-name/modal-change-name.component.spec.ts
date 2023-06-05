import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdjustUserComponent } from './modal-change-name.component';

describe('ModalAdjustUserComponent', () => {
  let component: ModalAdjustUserComponent;
  let fixture: ComponentFixture<ModalAdjustUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdjustUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdjustUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
