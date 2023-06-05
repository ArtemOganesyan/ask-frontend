import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {List} from 'immutable';
import {Assignment} from '../../../models/assignment';

@Component({
  selector: 'ac-home-teacher',
  templateUrl: './home-teacher.component.html',
  styleUrls: ['./home-teacher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTeacherComponent implements OnInit {

  @Input() users: List<User>;
  @Input() assignments: List<Assignment>;

  constructor() { }

  ngOnInit() {
  }

  get totalSubmissionsToGrade(): number {
    return this.assignments
      .filter(assignment => assignment.isAutoGraded() && !assignment.isPassed())
      .toList()
      .count();
  }

  get autoGradedSubmissions(): number {
    return this.assignments
      .filter(assignment => assignment.isGraded() && assignment.isPassed() && assignment.isAutoGraded())
      .toList()
      .count();
  }

  get pendingSubmissionAssignments(): number {
    return this.assignments
      .filter(assignment => assignment.isPending())
      .count();
  }

  get teachersCount(): number {
    return this.users
      .filter(user => user.isTeacher)
      .toList()
      .count();
  }
}
