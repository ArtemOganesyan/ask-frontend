import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsListPageComponent } from './assignments-list-page.component';

describe('AssignmentsListPageComponent', () => {
  let component: AssignmentsListPageComponent;
  let fixture: ComponentFixture<AssignmentsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
