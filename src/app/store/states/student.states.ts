import {Assignment} from '../../models/assignment';
import {List} from 'immutable';
import {AssignmentToPass} from '../../models/assignment.to.pass';

export interface StudentState {

  assignments: List<AssignmentToPass>;

  isAssignmentsLoading: boolean;
  isAssignmentsSubmitting: boolean;

  grades: List<Assignment>;
  isGradesLoading: boolean;
}

export const initStudentState: StudentState = {
  assignments: List([]),

  isAssignmentsLoading: false,
  isAssignmentsSubmitting: false,

  grades: List([]),
  isGradesLoading: false
};
