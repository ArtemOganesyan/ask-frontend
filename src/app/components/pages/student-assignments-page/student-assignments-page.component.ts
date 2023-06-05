import { Component, OnInit } from '@angular/core';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {LoadStudentAssignments} from '../../../store/actions/student.actions';
import {StudentSelectors} from '../../../store/selectors/student.selectors';

@Component({
  selector: 'ac-student-assignments-page',
  templateUrl: './student-assignments-page.component.html',
  styleUrls: ['./student-assignments-page.component.scss']
})
export class StudentAssignmentsPageComponent implements OnInit {

  constructor(public store: Store<GlobalState>, public studentSelectors: StudentSelectors) { }

  ngOnInit() {
    this.store.dispatch(new LoadStudentAssignments());
  }

}
