import {DataState, initDataState} from '../states/data.states';
import {
  ChangeUserGroupSuccess,
  ChangeUserNameSuccess,
  ChangeUserRoleSuccess,
  CreateAssignmentSuccess,
  DataActions,
  DataActionTypes,
  DeleteAssignmentSuccess,
  DeleteQuizSuccess,
  DeleteUserSuccess, GradeAssignmentSuccess,
  LoadAssignmentsSuccess,
  LoadQuizzesSuccess,
  LoadUsersSuccess,
  SaveQuizSuccess
} from '../actions/data.actions';
import {ReduxHelper} from '../../helpers/ReduxHelper';

export function dataReducer(state = initDataState, action: DataActions): DataState {
  switch (action.type) {

    case DataActionTypes.SET_ACTIVE_USER: {
      return {...state, activeUser: action.payload.user};
    }

    case DataActionTypes.LOAD_QUIZZES: {
      return {...state, isQuizzesLoading: true};
    }

    case DataActionTypes.LOAD_QUIZZES_SUCCESS: {
      return {
        ...state,
        isQuizzesLoading: false,
        quizzes: ReduxHelper.sort((action as LoadQuizzesSuccess).payload.quizzes)
      };
    }

    case DataActionTypes.LOAD_QUIZZES_FAILURE: {
      return {...state, isQuizzesLoading: false};
    }

    case DataActionTypes.SAVE_QUIZ: {
      return {...state, isQuizSaving: true};
    }

    case DataActionTypes.SAVE_QUIZ_SUCCESS: {
      return {
        ...state,
        isQuizSaving: false,
        quizzes: ReduxHelper.sort(
          state.quizzes
            .filter(quiz => quiz.id !== (action as SaveQuizSuccess).payload.quiz.id)
            .toList()
            .push((action as SaveQuizSuccess).payload.quiz)
        )
      };
    }

    case DataActionTypes.SAVE_QUIZ_FAILURE: {
      return {...state, isQuizSaving: false};
    }

    case DataActionTypes.DELETE_QUIZ: {
      return {...state, isQuizDeleting: true};
    }

    case DataActionTypes.DELETE_QUIZ_SUCCESS: {
      return {
        ...state,
        isQuizDeleting: false,
        quizzes: state.quizzes
          .filter(quiz => quiz.id !== (action as DeleteQuizSuccess).payload.quizId)
          .toList()
      };
    }

    case DataActionTypes.DELETE_QUIZ_FAILURE: {
      return {...state, isQuizDeleting: false};
    }

    case DataActionTypes.LOAD_USERS: {
      return {...state, isUsersLoading: true};
    }

    case DataActionTypes.LOAD_USERS_SUCCESS: {
      return {
        ...state,
        isUsersLoading: false,
        users: ReduxHelper.sort((action as LoadUsersSuccess).payload.users)
      };
    }

    case DataActionTypes.LOAD_USERS_FAILURE: {
      return {...state, isUsersLoading: false};
    }

    case DataActionTypes.DELETE_USER: {
      return {...state, isUserDeleting: true};
    }

    case DataActionTypes.DELETE_USER_SUCCESS: {
      return {
        ...state,
        isUserDeleting: false,
        users: state.users
          .filter(user => user.id !== (action as DeleteUserSuccess).payload.userId)
          .toList()
      };
    }

    case DataActionTypes.DELETE_USER_FAILURE: {
      return {...state, isUserDeleting: false};
    }

    case DataActionTypes.CHANGE_USER_NAME: {
      return {...state, isUserSaving: true};
    }

    case DataActionTypes.CHANGE_USER_NAME_SUCCESS: {
      return {
        ...state,
        isUserSaving: false,
        users: ReduxHelper.sort(
          state.users
            .filter(user => user.id !== (action as ChangeUserNameSuccess).payload.user.id)
            .toList()
            .push((action as ChangeUserNameSuccess).payload.user)
        )
      };
    }

    case DataActionTypes.CHANGE_USER_NAME_FAILURE: {
      return {...state, isUserSaving: false};
    }

    case DataActionTypes.CHANGE_USER_GROUP: {
      return {...state, isUserSaving: true};
    }

    case DataActionTypes.CHANGE_USER_GROUP_SUCCESS: {
      return {
        ...state,
        isUserSaving: false,
        users: ReduxHelper.sort(
          state.users
            .filter(user => user.id !== (action as ChangeUserGroupSuccess).payload.user.id)
            .toList()
            .push((action as ChangeUserGroupSuccess).payload.user)
        )
      };
    }

    case DataActionTypes.CHANGE_USER_GROUP_FAILURE: {
      return {...state, isUserSaving: false};
    }

    case DataActionTypes.CHANGE_USER_ROLE: {
      return {...state, isUserSaving: true};
    }

    case DataActionTypes.CHANGE_USER_ROLE_SUCCESS: {
      return {
        ...state,
        isUserSaving: false,
        users: ReduxHelper.sort(
          state.users
            .filter(user => user.id !== (action as ChangeUserRoleSuccess).payload.user.id)
            .toList()
            .push((action as ChangeUserRoleSuccess).payload.user)
        )
      };
    }

    case DataActionTypes.CHANGE_USER_ROLE_FAILURE: {
      return {...state, isUserSaving: false};
    }

    case DataActionTypes.CREATE_ASSIGNMENT: {
      return {...state, isAssignmentsSaving: true};
    }

    case DataActionTypes.CREATE_ASSIGNMENT_SUCCESS: {
      return {
        ...state,
        isAssignmentsSaving: false,
        assignments: ReduxHelper.sort(
          state.assignments.merge((action as CreateAssignmentSuccess).payload.assignments.toJS())
        )
      };
    }

    case DataActionTypes.CREATE_ASSIGNMENT_FAILURE: {
      return {...state, isAssignmentsSaving: false};
    }

    case DataActionTypes.LOAD_ASSIGNMENTS: {
      return {...state, isAssignmentsLoading: true};
    }

    case DataActionTypes.LOAD_ASSIGNMENTS_SUCCESS: {
      return {
        ...state,
        isAssignmentsLoading: false,
        assignments: ReduxHelper.sort((action as LoadAssignmentsSuccess).payload.assignments)
      };
    }

    case DataActionTypes.LOAD_ASSIGNMENTS_FAILURE: {
      return {...state, isAssignmentsLoading: false};
    }

    case DataActionTypes.DELETE_ASSIGNMENT: {
      return {...state, isAssignmentsDeleting: true};
    }

    case DataActionTypes.DELETE_ASSIGNMENT_SUCCESS: {
      return {
        ...state,
        isAssignmentsDeleting: false,
        assignments: state.assignments
          .filter(assignment => assignment.assignmentGroupID !== (action as DeleteAssignmentSuccess).payload.assignmentGroupID)
          .toList()
      };
    }

    case DataActionTypes.DELETE_ASSIGNMENT_FAILURE: {
      return {...state, isAssignmentsDeleting: false};
    }

    case DataActionTypes.GRADE_ASSIGNMENT: {
      return {...state, isAssignmentGrading: true};
    }

    case DataActionTypes.GRADE_ASSIGNMENT_SUCCESS: {
      return {
        ...state,
        isAssignmentGrading: false,
        assignments: ReduxHelper.sort((action as GradeAssignmentSuccess).payload.assignments)
      };
    }

    case DataActionTypes.GRADE_ASSIGNMENT_FAILURE: {
      return {...state, isAssignmentGrading: false};
    }
  }

  return state;
}
