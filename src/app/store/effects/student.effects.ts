import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {NotificationActions, ShowNotificationError} from '../actions/notification.actions';
import {HttpHelper} from '../../helpers/HttpHelper';
import {List} from 'immutable';
import {Router} from '@angular/router';
import {Assignment} from '../../models/assignment';
import {StudentHttpService} from '../../services/student-http.service';
import {
  LoadStudentAssignments,
  LoadStudentAssignmentsFailure,
  LoadStudentAssignmentsSuccess, LoadStudentGradesFailure, LoadStudentGradesSuccess, SavePasteDetection, SavePasteDetectionFailure,
  SavePasteDetectionSuccess,
  StudentActionTypes,
  SubmitStudentAssignment,
  SubmitStudentAssignmentFailure,
  SubmitStudentAssignmentSuccess
} from '../actions/student.actions';
import {MatDialog} from '@angular/material';
import {ModalNotificationComponent} from '../../components/modals/modal-notification/modal-notification.component';
import {AssignmentToPass} from '../../models/assignment.to.pass';

@Injectable()
export class StudentEffects {

  constructor(private actions$: Actions,
              private studentHttpService: StudentHttpService,
              private router: Router,
              private dialog: MatDialog) {
  }

  @Effect()
  loadStudentAssignments$ = this.actions$
    .ofType(StudentActionTypes.LOAD_STUDENT_ASSIGNMENTS)
    .switchMap(() => HttpHelper.slowDown(this.studentHttpService.loadStudentAssignments())
      .pipe(
        map((assignments: List<AssignmentToPass>) => new LoadStudentAssignmentsSuccess({assignments})),
        catchError(error => of<LoadStudentAssignmentsFailure | NotificationActions>(
          new LoadStudentAssignmentsFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  submitAssignment$ = this.actions$
    .ofType(StudentActionTypes.SUBMIT_STUDENT_ASSIGNMENT)
    .switchMap((action: SubmitStudentAssignment) => HttpHelper.slowDown(this.studentHttpService.submitAssignment(action.payload.assignmentResult))
      .do(() => this.dialog
        .open(ModalNotificationComponent, {
          width: '30em',
          data: {
            text: 'Your submission has been accepted. You might track your results on "My Grades" page.',
            title: 'Success!',
            action: 'Ok'
          }
        })
        .afterClosed()
        .subscribe(() => this.router.navigate(['/my-assignments']))
      )
      .pipe(
        map((grades: List<Assignment>) => new SubmitStudentAssignmentSuccess({
          submittedAssignmentId: action.payload.assignmentResult.assignmentId,
          grades
        })),
        catchError(error => of<SubmitStudentAssignmentFailure | NotificationActions>(
          new SubmitStudentAssignmentFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  loadStudentGrades$ = this.actions$
    .ofType(StudentActionTypes.LOAD_STUDENT_GRADES)
    .switchMap(() => HttpHelper.slowDown(this.studentHttpService.loadStudentGrades())
      .pipe(
        map((grades: List<Assignment>) => new LoadStudentGradesSuccess({grades})),
        catchError(error => of<LoadStudentGradesFailure | NotificationActions>(
          new LoadStudentGradesFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  savePasteDetection$ = this.actions$
    .ofType(StudentActionTypes.SAVE_PASTE_DETECTION)
    .switchMap((action: SavePasteDetection) => this.studentHttpService
      .savePasteDetection(action.payload.assignmentId, action.payload.questionNumber, action.payload.value)
      .map(() => new SavePasteDetectionSuccess())
      .catch(() => of(new SavePasteDetectionFailure()))
    );

}
