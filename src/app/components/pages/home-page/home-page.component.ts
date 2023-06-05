import {Component, OnInit} from '@angular/core';
import {AuthSelectors} from '../../../store/selectors/auth.selectors';
import {DataSelectors} from '../../../store/selectors/data.selectors';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {UserRole} from '../../../enums/UserRole';
import {LoadAssignments, LoadUsers} from '../../../store/actions/data.actions';
import {LoadStudentAssignments, LoadStudentGrades} from '../../../store/actions/student.actions';
import {StudentSelectors} from '../../../store/selectors/student.selectors';

@Component({
  selector: 'ac-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public authSelectors: AuthSelectors,
              public dataSelectors: DataSelectors,
              public studentSelectors: StudentSelectors,
              public store: Store<GlobalState>) {
  }

  ngOnInit() {
    this.authSelectors
      .activeUserRole$
      .first()
      .subscribe((role: UserRole) => {
        if (role === UserRole.TEACHER) {
          this.store.dispatch(new LoadUsers());
          this.store.dispatch(new LoadAssignments());
        } else {
          this.store.dispatch(new LoadStudentGrades());
          this.store.dispatch(new LoadStudentAssignments());
        }
      });
  }


}
