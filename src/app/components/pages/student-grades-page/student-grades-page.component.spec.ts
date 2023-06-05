import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradesPageComponent } from './student-grades-page.component';

describe('StudentGradesPageComponent', () => {
  let component: StudentGradesPageComponent;
  let fixture: ComponentFixture<StudentGradesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentGradesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGradesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
