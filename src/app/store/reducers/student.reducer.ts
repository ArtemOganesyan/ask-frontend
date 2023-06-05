import {
  LoadStudentAssignmentsSuccess, LoadStudentGradesSuccess, StudentActions, StudentActionTypes,
  SubmitStudentAssignmentSuccess
} from '../actions/student.actions';
import {initStudentState, StudentState} from '../states/student.states';
import {ReduxHelper} from '../../helpers/ReduxHelper';

export function studentReducer(state = initStudentState, action: StudentActions): StudentState {
  switch (action.type) {

    case StudentActionTypes.LOAD_STUDENT_ASSIGNMENTS: {
      return {...state, isAssignmentsLoading: true};
    }

    case StudentActionTypes.LOAD_STUDENT_ASSIGNMENTS_SUCCESS: {
      return {
        ...state,
        isAssignmentsLoading: false,
        assignments: ReduxHelper.sort((action as LoadStudentAssignmentsSuccess).payload.assignments)
      };
    }

    case StudentActionTypes.LOAD_STUDENT_ASSIGNMENTS_FAILURE: {
      return {...state, isAssignmentsLoading: false};
    }

    case StudentActionTypes.SUBMIT_STUDENT_ASSIGNMENT: {
      return {...state, isAssignmentsSubmitting: true};
    }

    case StudentActionTypes.SUBMIT_STUDENT_ASSIGNMENT_SUCCESS: {
      const submittedAssignmentId = (action as SubmitStudentAssignmentSuccess).payload.submittedAssignmentId;
      const grades = (action as SubmitStudentAssignmentSuccess).payload.grades;

      return {
        ...state,
        isAssignmentsSubmitting: false,
        assignments: state.assignments
          .filter(assignment => assignment.id !== submittedAssignmentId)
          .toList(),
        grades
      };
    }

    case StudentActionTypes.SUBMIT_STUDENT_ASSIGNMENT_FAILURE: {
      return {...state, isAssignmentsSubmitting: false};
    }

    case StudentActionTypes.LOAD_STUDENT_GRADES: {
      return {...state, isGradesLoading: true};
    }

    case StudentActionTypes.LOAD_STUDENT_GRADES_SUCCESS: {
      return {
        ...state,
        isGradesLoading: false,
        grades: ReduxHelper.sort((action as LoadStudentGradesSuccess).payload.grades)
      };
    }

    case StudentActionTypes.LOAD_STUDENT_GRADES_FAILURE: {
      return {...state, isGradesLoading: false};
    }

    default: {
      return state;
    }
  }
}
