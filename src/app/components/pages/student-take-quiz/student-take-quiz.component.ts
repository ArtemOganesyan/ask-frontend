import {Component, OnInit} from '@angular/core';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {StudentSelectors} from '../../../store/selectors/student.selectors';
import {LoadStudentAssignments, SubmitStudentAssignment} from '../../../store/actions/student.actions';
import {ActivatedRoute} from '@angular/router';
import {Assignment} from '../../../models/assignment';
import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import {Quiz} from '../../../models/quiz';
import {FormGroup} from '@angular/forms';
import {AssignmentResult} from '../../../models/assignment.result';
import {AssignmentToPass} from '../../../models/assignment.to.pass';

@Component({
  selector: 'ac-student-take-quiz',
  templateUrl: './student-take-quiz.component.html',
  styleUrls: ['./student-take-quiz.component.scss']
})
export class StudentTakeQuizComponent implements OnInit {

  public quiz$: Observable<Quiz>;
  public form: FormGroup;
  public assignmentId$: Observable<number>;

  constructor(public store: Store<GlobalState>, public studentSelectors: StudentSelectors, public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.assignmentId$ = this.activatedRoute.params
      .map(params => Number(params['id']));

    this.quiz$ = this.assignmentId$
      .combineLatest(this.studentSelectors.assignments$)
      .map(([id, assignments]: [number, List<AssignmentToPass>]) => assignments.find(assignment => assignment.id === id) || null)
      .filter(assignment => assignment !== null)
      .map(assignment => assignment.quiz);

    this.loadAssignments();
  }

  submit(assignmentResult: AssignmentResult) {
    this.store.dispatch(new SubmitStudentAssignment({assignmentResult}));
  }

  private loadAssignments(): void {
    this.studentSelectors.assignments$
      .first()
      .filter(assignments => assignments.count() === 0)
      .subscribe(() => this.store.dispatch(new LoadStudentAssignments()));
  }

}
