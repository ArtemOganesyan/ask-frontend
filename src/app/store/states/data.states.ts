import {User} from '../../models/user';
import {List} from 'immutable';
import {Quiz} from '../../models/quiz';
import {Assignment} from '../../models/assignment';

export interface DataState {
  activeUser: Partial<User>

  quizzes: List<Quiz>;
  isQuizzesLoading: boolean;
  isQuizSaving: boolean;
  isQuizDeleting: boolean;

  users: List<User>;
  isUsersLoading: boolean;
  isUserSaving: boolean;
  isUserDeleting: boolean;

  assignments: List<Assignment>;
  isAssignmentsLoading: boolean;
  isAssignmentsSaving: boolean;
  isAssignmentsDeleting: boolean;
  isAssignmentGrading: boolean;

}

export const initDataState: DataState = {
  activeUser: null,
  users: List(),

  isQuizzesLoading: false,
  isQuizSaving: false,
  isQuizDeleting: false,

  quizzes: List(),
  isUsersLoading: false,
  isUserSaving: false,
  isUserDeleting: false,

  assignments: List(),
  isAssignmentsLoading: false,
  isAssignmentsSaving: false,
  isAssignmentsDeleting: false,
  isAssignmentGrading: false

};
