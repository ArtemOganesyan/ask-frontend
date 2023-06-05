import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Actions, Effect} from '@ngrx/effects';
import {catchError, map, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {NotificationActions, ShowNotificationError} from '../actions/notification.actions';
import {HttpHelper} from '../../helpers/HttpHelper';
import {
  ChangeUserGroup, ChangeUserGroupFailure, ChangeUserGroupSuccess,
  ChangeUserName,
  ChangeUserNameFailure,
  ChangeUserNameSuccess,
  ChangeUserRole,
  ChangeUserRoleFailure,
  ChangeUserRoleSuccess,
  CreateAssignment,
  CreateAssignmentFailure,
  CreateAssignmentSuccess,
  DataActionTypes,
  DeleteAssignment,
  DeleteAssignmentFailure,
  DeleteAssignmentSuccess,
  DeleteQuiz,
  DeleteQuizFailure,
  DeleteQuizSuccess,
  DeleteUser,
  DeleteUserFailure,
  DeleteUserSuccess,
  GradeAssignment,
  GradeAssignmentFailure,
  GradeAssignmentSuccess,
  LoadAssignmentsFailure,
  LoadAssignmentsSuccess,
  LoadQuizzesFailure,
  LoadQuizzesSuccess,
  LoadUsersFailure,
  LoadUsersSuccess,
  SaveQuiz,
  SaveQuizFailure,
  SaveQuizSuccess
} from '../actions/data.actions';
import {QuizHttpService} from '../../services/quiz-http.service';
import {Quiz} from '../../models/quiz';
import {List} from 'immutable';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {UserHttpService} from '../../services/user-http.service';
import {User} from '../../models/user';
import {AssignmentHttpService} from '../../services/assignment-http.service';
import {Assignment} from '../../models/assignment';

@Injectable()
export class DataEffects {

  constructor(private actions$: Actions,
              private quizHttpService: QuizHttpService,
              private userHttpService: UserHttpService,
              private assignmentHttpService: AssignmentHttpService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private localStorageService: LocalStorageService) {
  }

  @Effect()
  loadQuizzes$ = this.actions$
    .ofType(DataActionTypes.LOAD_QUIZZES)
    .switchMap(() => HttpHelper.slowDown(this.quizHttpService.loadQuizzes())
      .pipe(
        map((quizzes: List<Quiz>) => new LoadQuizzesSuccess({quizzes})),
        catchError(error => of<LoadQuizzesFailure | NotificationActions>(
          new LoadQuizzesFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  saveQuiz$ = this.actions$
    .ofType(DataActionTypes.SAVE_QUIZ)
    .switchMap((action: SaveQuiz) => HttpHelper
      .slowDown(action.payload.quiz.id
        ? this.quizHttpService.updateQuiz(action.payload.quiz)
        : this.quizHttpService.createQuiz(action.payload.quiz)
      )
      .pipe(
        map((quiz: Quiz) => {
          this.router.navigate(['/quizzes']);
          this.localStorageService.clearQuiz();
          return new SaveQuizSuccess({quiz});
        }),
        catchError(error => of<SaveQuizFailure | NotificationActions>(
          new SaveQuizFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  deleteQuiz$ = this.actions$
    .ofType(DataActionTypes.DELETE_QUIZ)
    .switchMap((action: DeleteQuiz) => HttpHelper
      .slowDown(this.quizHttpService.deleteQuiz(action.payload.quizId))
      .pipe(
        map(() => new DeleteQuizSuccess({quizId: action.payload.quizId})),
        catchError(error => of<DeleteQuizFailure | NotificationActions>(
          new DeleteQuizFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  loadUsers$ = this.actions$
    .ofType(DataActionTypes.LOAD_USERS)
    .switchMap(() => HttpHelper.slowDown(this.userHttpService.loadUsers())
      .pipe(
        map((users: List<User>) => new LoadUsersSuccess({users})),
        catchError(error => of<LoadUsersFailure | NotificationActions>(
          new LoadUsersFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  deleteUser$ = this.actions$
    .ofType(DataActionTypes.DELETE_USER)
    .switchMap((action: DeleteUser) => HttpHelper
      .slowDown(this.userHttpService.deleteUser(action.payload.userId))
      .do(() => this.router.navigate(['/users-management']))
      .pipe(
        map(() => new DeleteUserSuccess({userId: action.payload.userId})),
        catchError(error => of<DeleteUserFailure | NotificationActions>(
          new DeleteUserFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  changeUserName$ = this.actions$
    .ofType(DataActionTypes.CHANGE_USER_NAME)
    .switchMap((action: ChangeUserName) => HttpHelper
      .slowDown(this.userHttpService.changeUserName(action.payload.user, action.payload.name))
      .pipe(
        map((user: User) => new ChangeUserNameSuccess({user})),
        catchError(error => of<ChangeUserNameFailure | NotificationActions>(
          new ChangeUserNameFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  changeUserGroup$ = this.actions$
    .ofType(DataActionTypes.CHANGE_USER_GROUP)
    .switchMap((action: ChangeUserGroup) => HttpHelper
      .slowDown(this.userHttpService.changeUserGroup(action.payload.user, action.payload.group))
      .pipe(
        map((user: User) => new ChangeUserGroupSuccess({user})),
        catchError(error => of<ChangeUserGroupFailure | NotificationActions>(
          new ChangeUserGroupFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  changeUserRole$ = this.actions$
    .ofType(DataActionTypes.CHANGE_USER_ROLE)
    .switchMap((action: ChangeUserRole) => HttpHelper
      .slowDown(this.userHttpService.changeUserRole(action.payload.user, action.payload.role))
      .pipe(
        map((user: User) => new ChangeUserRoleSuccess({user})),
        catchError(error => of<ChangeUserRoleFailure | NotificationActions>(
          new ChangeUserRoleFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  loadAssignments$ = this.actions$
    .ofType(DataActionTypes.LOAD_ASSIGNMENTS)
    .switchMap(() => HttpHelper.slowDown(this.assignmentHttpService.loadAssignments())
      .pipe(
        map((assignments: List<Assignment>) => new LoadAssignmentsSuccess({assignments})),
        catchError(error => of<LoadAssignmentsFailure | NotificationActions>(
          new LoadAssignmentsFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  createAssignment$ = this.actions$
    .ofType(DataActionTypes.CREATE_ASSIGNMENT)
    .switchMap((action: CreateAssignment) => HttpHelper
      .slowDown(this.assignmentHttpService.createAssignment(action.payload.quizId, action.payload.userIds))
      .pipe(
        map((assignments: List<Assignment>) => {
          this.router.navigate(['/assignments']);
          return new CreateAssignmentSuccess({assignments});
        }),
        catchError(error => of<CreateAssignmentFailure | NotificationActions>(
          new CreateAssignmentFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  deleteAssignment$ = this.actions$
    .ofType(DataActionTypes.DELETE_ASSIGNMENT)
    .switchMap((action: DeleteAssignment) => HttpHelper
      .slowDown(this.assignmentHttpService.deleteAssignment(action.payload.assignmentGroupID))
      .pipe(
        map(() => new DeleteAssignmentSuccess({assignmentGroupID: action.payload.assignmentGroupID})),
        catchError(error => of<DeleteAssignmentFailure | NotificationActions>(
          new DeleteAssignmentFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  gradeAssignment$ = this.actions$
    .ofType(DataActionTypes.GRADE_ASSIGNMENT)
    .switchMap((action: GradeAssignment) => HttpHelper
      .slowDown(this.assignmentHttpService.gradeAssignment(action.payload.assignmentId, action.payload.grade))
      .pipe(
        map((assignments: List<Assignment>) => {
          this.location.back();
          return new GradeAssignmentSuccess({assignments});
        }),
        catchError(error => of<GradeAssignmentFailure | NotificationActions>(
          new GradeAssignmentFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

}
