import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasteDetectionComponent } from './paste-detection.component';

describe('PasteDetectionComponent', () => {
  let component: PasteDetectionComponent;
  let fixture: ComponentFixture<PasteDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasteDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasteDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
