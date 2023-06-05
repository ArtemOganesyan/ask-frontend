import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentsPageComponent } from './student-assignments-page.component';

describe('StudentAssignmentsPageComponent', () => {
  let component: StudentAssignmentsPageComponent;
  let fixture: ComponentFixture<StudentAssignmentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignmentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
