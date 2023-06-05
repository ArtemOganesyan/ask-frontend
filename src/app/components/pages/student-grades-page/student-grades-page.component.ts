import {Component, OnInit} from '@angular/core';
import {LoadStudentGrades} from '../../../store/actions/student.actions';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {StudentSelectors} from '../../../store/selectors/student.selectors';
import {Assignment} from '../../../models/assignment';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'ac-student-grades-page',
  templateUrl: './student-grades-page.component.html',
  styleUrls: ['./student-grades-page.component.scss']
})
export class StudentGradesPageComponent implements OnInit {

  constructor(public store: Store<GlobalState>,
              public studentSelectors: StudentSelectors,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadStudentGrades());
  }

}
