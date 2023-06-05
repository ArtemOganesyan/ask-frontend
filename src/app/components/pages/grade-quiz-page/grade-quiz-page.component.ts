import {Component, OnInit} from '@angular/core';
import {DataSelectors} from '../../../store/selectors/data.selectors';
import {ActivatedRoute} from '@angular/router';
import {Assignment} from '../../../models/assignment';
import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {GradeAssignment, LoadAssignments, LoadUsers} from '../../../store/actions/data.actions';
import {IGradeForm} from '../../../interfaces/IGradeForm';

@Component({
  selector: 'ac-grade-quiz-page',
  templateUrl: './grade-quiz-page.component.html',
  styleUrls: ['./grade-quiz-page.component.scss']
})
export class GradeQuizPageComponent implements OnInit {

  public assignment$: Observable<Assignment>;
  public backScreen$: Observable<string>;

  constructor(public dataSelectors: DataSelectors, public activatedRoute: ActivatedRoute, public store: Store<GlobalState>) {
  }

  ngOnInit() {
    this.assignment$ = this.activatedRoute.params
      .map(params => Number(params['id']))
      .combineLatest(this.dataSelectors.submittedAssignments$)
      .map(([id, assignments]: [number, List<Assignment>]) => assignments.find(assignment => assignment.id === id));

    this.backScreen$ = this.activatedRoute.queryParams.map(params => params['back']);

    this.fetchAssignments();
    this.fetchUsers();
  }

  submit(grade: IGradeForm) {
    this.assignment$
      .first()
      .subscribe((assignment) => this.store.dispatch(new GradeAssignment({assignmentId: assignment.id, grade})));
  }


  private fetchAssignments(): void {
    this.dataSelectors
      .assignments$
      .first()
      .filter(assignments => assignments.count() === 0)
      .subscribe(() => this.store.dispatch(new LoadAssignments()));
  }

  private fetchUsers(): void {
    this.dataSelectors
      .users$
      .first()
      .filter(users => users.count() === 0)
      .subscribe(() => this.store.dispatch(new LoadUsers()));
  }

}
