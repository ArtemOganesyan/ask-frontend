import {Component, Input, OnInit} from '@angular/core';
import {AssignmentToPass} from '../../../models/assignment.to.pass';
import {List} from 'immutable';
import {Assignment} from '../../../models/assignment';

@Component({
  selector: 'ac-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.scss']
})
export class HomeStudentComponent implements OnInit {

  @Input() assignments: List<AssignmentToPass>;
  @Input() grades: List<Assignment>;

  constructor() {
  }

  ngOnInit() {
  }

  get gradedAssignments(): number {
    return this.grades
      .filter(grade => !grade.isPending())
      .count();
  }

}
