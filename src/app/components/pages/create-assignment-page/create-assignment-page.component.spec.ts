import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignmentPageComponent } from './create-assignment-page.component';

describe('CreateAssignmentPageComponent', () => {
  let component: CreateAssignmentPageComponent;
  let fixture: ComponentFixture<CreateAssignmentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAssignmentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssignmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
