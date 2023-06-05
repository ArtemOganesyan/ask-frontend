import {Injectable} from '@angular/core';
import {GlobalState} from '../states';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';
import {AssignmentToPass} from '../../models/assignment.to.pass';
import {Assignment} from '../../models/assignment';

@Injectable()
export class StudentSelectors {

  constructor(private store: Store<GlobalState>) {
  }

  get assignments$(): Observable<List<AssignmentToPass>> {
    return this.store.select(store => store.studentState.assignments);
  }

  get isAssignmentsLoading$(): Observable<boolean> {
    return this.store.select(store => store.studentState.isAssignmentsLoading);
  }

  get isAssignmentsSubmitting$(): Observable<boolean> {
    return this.store.select(store => store.studentState.isAssignmentsSubmitting);
  }

  get grades$(): Observable<List<Assignment>> {
    return this.store.select(state => state.studentState.grades);
  }

  get isGradesLoading$(): Observable<boolean> {
    return this.store.select(state => state.studentState.isGradesLoading);
  }

}
