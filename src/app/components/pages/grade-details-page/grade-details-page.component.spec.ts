import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeDetailsPageComponent } from './grade-details-page.component';

describe('GradeDetailsPageComponent', () => {
  let component: GradeDetailsPageComponent;
  let fixture: ComponentFixture<GradeDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
