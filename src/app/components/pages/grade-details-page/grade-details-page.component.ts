import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentSelectors} from '../../../store/selectors/student.selectors';
import {Assignment} from '../../../models/assignment';
import {List} from 'immutable';
import {AuthSelectors} from '../../../store/selectors/auth.selectors';
import {User} from '../../../models/user';
import {Observable} from 'rxjs/Observable';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {LoadStudentGrades} from '../../../store/actions/student.actions';

@Component({
  selector: 'ac-grade-details-page',
  templateUrl: './grade-details-page.component.html',
  styleUrls: ['./grade-details-page.component.scss']
})
export class GradeDetailsPageComponent implements OnInit {

  public users$: Observable<List<User>>;
  public grade$: Observable<Assignment>;

  constructor(public activatedRoute: ActivatedRoute,
              public studentSelectors: StudentSelectors,
              public authSelectors: AuthSelectors,
              public store: Store<GlobalState>) {
  }

  ngOnInit() {
    this.grade$ = this.activatedRoute.params
      .map(params => Number(params['id']))
      .combineLatest(this.studentSelectors.grades$)
      .map(([id, grades]: [number, List<Assignment>]) => grades.find(grade => grade.id === id));

    this.users$ = this.authSelectors
      .activeUser$
      .map((user: Partial<User>) => List([user as User]));

    this.grade$
      .first()
      .filter(grade => !Boolean(grade))
      .subscribe(() => this.store.dispatch(new LoadStudentGrades()));
  }

}
