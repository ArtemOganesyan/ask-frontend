import {Action} from '@ngrx/store';
import {User} from '../../models/user';
import {Quiz} from '../../models/quiz';
import {List} from 'immutable';
import {UserRole} from '../../enums/UserRole';
import {Assignment} from '../../models/assignment';
import {IGradeForm} from '../../interfaces/IGradeForm';

export enum DataActionTypes {

  SET_ACTIVE_USER = 'SET_ACTIVE_USER',

  LOAD_QUIZZES = 'LOAD_QUIZZES',
  LOAD_QUIZZES_SUCCESS = 'LOAD_QUIZZES_SUCCESS',
  LOAD_QUIZZES_FAILURE = 'LOAD_QUIZZES_FAILURE',

  SAVE_QUIZ = 'SAVE_QUIZ',
  SAVE_QUIZ_SUCCESS = 'SAVE_QUIZ_SUCCESS',
  SAVE_QUIZ_FAILURE = 'SAVE_QUIZ_FAILURE',

  DELETE_QUIZ = 'DELETE_QUIZ',
  DELETE_QUIZ_SUCCESS = 'DELETE_QUIZ_SUCCESS',
  DELETE_QUIZ_FAILURE = 'DELETE_QUIZ_FAILURE',

  LOAD_USERS = 'LOAD_USERS',
  LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS',
  LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE',

  CHANGE_USER_NAME = 'CHANGE_USER_NAME',
  CHANGE_USER_NAME_SUCCESS = 'CHANGE_USER_NAME_SUCCESS',
  CHANGE_USER_NAME_FAILURE = 'CHANGE_USER_NAME_FAILURE',

  CHANGE_USER_ROLE = 'CHANGE_USER_ROLE',
  CHANGE_USER_ROLE_SUCCESS = 'CHANGE_USER_ROLE_SUCCESS',
  CHANGE_USER_ROLE_FAILURE = 'CHANGE_USER_ROLE_FAILURE',

  CHANGE_USER_GROUP = 'CHANGE_USER_GROUP',
  CHANGE_USER_GROUP_SUCCESS = 'CHANGE_USER_GROUP_SUCCESS',
  CHANGE_USER_GROUP_FAILURE = 'CHANGE_USER_GROUP_FAILURE',

  DELETE_USER = 'DELETE_USER',
  DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE = 'DELETE_USER_FAILURE',

  CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT',
  CREATE_ASSIGNMENT_SUCCESS = 'CREATE_ASSIGNMENT_SUCCESS',
  CREATE_ASSIGNMENT_FAILURE = 'CREATE_ASSIGNMENT_FAILURE',

  LOAD_ASSIGNMENTS = 'LOAD_ASSIGNMENTS',
  LOAD_ASSIGNMENTS_SUCCESS = 'LOAD_ASSIGNMENTS_SUCCESS',
  LOAD_ASSIGNMENTS_FAILURE = 'LOAD_ASSIGNMENTS_FAILURE',

  DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT',
  DELETE_ASSIGNMENT_SUCCESS = 'DELETE_ASSIGNMENT_SUCCESS',
  DELETE_ASSIGNMENT_FAILURE = 'DELETE_ASSIGNMENT_FAILURE',

  GRADE_ASSIGNMENT = 'GRADE_ASSIGNMENT',
  GRADE_ASSIGNMENT_SUCCESS = 'GRADE_ASSIGNMENT_SUCCESS',
  GRADE_ASSIGNMENT_FAILURE = 'GRADE_ASSIGNMENT_FAILURE'

}

export class SetActiveUser implements Action {
  readonly type = DataActionTypes.SET_ACTIVE_USER;

  constructor(public payload: { user: Partial<User> }) {
  }
}

export class LoadQuizzes implements Action {
  readonly type = DataActionTypes.LOAD_QUIZZES;

  constructor() {
  }
}

export class LoadQuizzesSuccess implements Action {
  readonly type = DataActionTypes.LOAD_QUIZZES_SUCCESS;

  constructor(public payload: { quizzes: List<Quiz> }) {
  }
}

export class LoadQuizzesFailure implements Action {
  readonly type = DataActionTypes.LOAD_QUIZZES_FAILURE;

  constructor() {
  }
}

export class SaveQuiz implements Action {
  readonly type = DataActionTypes.SAVE_QUIZ;

  constructor(public payload: { quiz: Quiz }) {
  }
}

export class SaveQuizSuccess implements Action {
  readonly type = DataActionTypes.SAVE_QUIZ_SUCCESS;

  constructor(public payload: { quiz: Quiz }) {
  }
}

export class SaveQuizFailure implements Action {
  readonly type = DataActionTypes.SAVE_QUIZ_FAILURE;

  constructor() {
  }
}

export class DeleteQuiz implements Action {
  readonly type = DataActionTypes.DELETE_QUIZ;

  constructor(public payload: { quizId: number }) {
  }
}

export class DeleteQuizSuccess implements Action {
  readonly type = DataActionTypes.DELETE_QUIZ_SUCCESS;

  constructor(public payload: { quizId: number }) {
  }
}

export class DeleteQuizFailure implements Action {
  readonly type = DataActionTypes.DELETE_QUIZ_FAILURE;

  constructor() {
  }
}

export class LoadUsers implements Action {
  readonly type = DataActionTypes.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
  readonly type = DataActionTypes.LOAD_USERS_SUCCESS;

  constructor(public payload: { users: List<User> }) {
  }
}

export class LoadUsersFailure implements Action {
  readonly type = DataActionTypes.LOAD_USERS_FAILURE;

  constructor() {
  }
}

export class ChangeUserName implements Action {
  readonly type = DataActionTypes.CHANGE_USER_NAME;

  constructor(public payload: { user: User, name: string }) {
  }
}

export class ChangeUserNameSuccess implements Action {
  readonly type = DataActionTypes.CHANGE_USER_NAME_SUCCESS;

  constructor(public payload: { user: User }) {
  }
}

export class ChangeUserNameFailure implements Action {
  readonly type = DataActionTypes.CHANGE_USER_NAME_FAILURE;

  constructor() {
  }
}

export class ChangeUserGroup implements Action {
  readonly type = DataActionTypes.CHANGE_USER_GROUP;

  constructor(public payload: { user: User, group: string }) {
  }
}

export class ChangeUserGroupSuccess implements Action {
  readonly type = DataActionTypes.CHANGE_USER_GROUP_SUCCESS;

  constructor(public payload: { user: User }) {
  }
}

export class ChangeUserGroupFailure implements Action {
  readonly type = DataActionTypes.CHANGE_USER_GROUP_FAILURE;

  constructor() {
  }
}

export class ChangeUserRole implements Action {
  readonly type = DataActionTypes.CHANGE_USER_ROLE;

  constructor(public payload: { user: User, role: UserRole }) {
  }
}

export class ChangeUserRoleSuccess implements Action {
  readonly type = DataActionTypes.CHANGE_USER_ROLE_SUCCESS;

  constructor(public payload: { user: User }) {
  }
}

export class ChangeUserRoleFailure implements Action {
  readonly type = DataActionTypes.CHANGE_USER_ROLE_FAILURE;

  constructor() {
  }
}

export class DeleteUser implements Action {
  readonly type = DataActionTypes.DELETE_USER;

  constructor(public payload: { userId: number }) {
  }
}

export class DeleteUserSuccess implements Action {
  readonly type = DataActionTypes.DELETE_USER_SUCCESS;

  constructor(public payload: { userId: number }) {
  }
}

export class DeleteUserFailure implements Action {
  readonly type = DataActionTypes.DELETE_USER_FAILURE;

  constructor() {
  }
}

export class CreateAssignment implements Action {
  readonly type = DataActionTypes.CREATE_ASSIGNMENT;

  constructor(public payload: { quizId: number, userIds: List<number> }) {
  }
}

export class CreateAssignmentSuccess implements Action {
  readonly type = DataActionTypes.CREATE_ASSIGNMENT_SUCCESS;

  constructor(public payload: { assignments: List<Assignment> }) {
  }
}

export class CreateAssignmentFailure implements Action {
  readonly type = DataActionTypes.CREATE_ASSIGNMENT_FAILURE;

  constructor() {
  }
}

export class LoadAssignments implements Action {
  readonly type = DataActionTypes.LOAD_ASSIGNMENTS;

  constructor() {
  }
}

export class LoadAssignmentsSuccess implements Action {
  readonly type = DataActionTypes.LOAD_ASSIGNMENTS_SUCCESS;

  constructor(public payload: { assignments: List<Assignment> }) {
  }
}

export class LoadAssignmentsFailure implements Action {
  readonly type = DataActionTypes.LOAD_ASSIGNMENTS_FAILURE;

  constructor() {
  }
}

export class GradeAssignment implements Action {
  readonly type = DataActionTypes.GRADE_ASSIGNMENT;

  constructor(public payload: { assignmentId: number, grade: IGradeForm }) {
  }
}

export class GradeAssignmentSuccess implements Action {
  readonly type = DataActionTypes.GRADE_ASSIGNMENT_SUCCESS;

  constructor(public payload: { assignments: List<Assignment> }) {
  }
}

export class GradeAssignmentFailure implements Action {
  readonly type = DataActionTypes.GRADE_ASSIGNMENT_FAILURE;

  constructor() {
  }
}

export class DeleteAssignment implements Action {
  readonly type = DataActionTypes.DELETE_ASSIGNMENT;

  constructor(public payload: { assignmentGroupID: string }) {
  }
}

export class DeleteAssignmentSuccess implements Action {
  readonly type = DataActionTypes.DELETE_ASSIGNMENT_SUCCESS;

  constructor(public payload: { assignmentGroupID: string }) {
  }
}

export class DeleteAssignmentFailure implements Action {
  readonly type = DataActionTypes.DELETE_ASSIGNMENT_FAILURE;

  constructor() {
  }
}


export type DataActions =
  SetActiveUser
  | LoadQuizzes
  | LoadQuizzesSuccess
  | LoadQuizzesFailure
  | SaveQuiz
  | SaveQuizSuccess
  | SaveQuizFailure
  | DeleteQuiz
  | DeleteQuizSuccess
  | DeleteQuizFailure
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFailure
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFailure
  | ChangeUserName
  | ChangeUserNameSuccess
  | ChangeUserNameFailure
  | ChangeUserGroup
  | ChangeUserGroupSuccess
  | ChangeUserGroupFailure
  | ChangeUserRole
  | ChangeUserRoleSuccess
  | ChangeUserRoleFailure
  | CreateAssignment
  | CreateAssignmentSuccess
  | CreateAssignmentFailure
  | LoadAssignments
  | LoadAssignmentsSuccess
  | LoadAssignmentsFailure
  | DeleteAssignment
  | DeleteAssignmentSuccess
  | DeleteAssignmentFailure
  | GradeAssignment
  | GradeAssignmentSuccess
  | GradeAssignmentFailure;
