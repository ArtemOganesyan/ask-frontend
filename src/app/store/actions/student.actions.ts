import {Action} from '@ngrx/store';
import {Assignment} from '../../models/assignment';
import {List} from 'immutable';
import {AssignmentResult} from '../../models/assignment.result';
import {AssignmentToPass} from '../../models/assignment.to.pass';

export enum StudentActionTypes {

  LOAD_STUDENT_ASSIGNMENTS = 'LOAD_STUDENT_ASSIGNMENTS',
  LOAD_STUDENT_ASSIGNMENTS_SUCCESS = 'LOAD_STUDENT_ASSIGNMENTS_SUCCESS',
  LOAD_STUDENT_ASSIGNMENTS_FAILURE = 'LOAD_STUDENT_ASSIGNMENTS_FAILURE',

  SUBMIT_STUDENT_ASSIGNMENT = 'SUBMIT_STUDENT_ASSIGNMENT',
  SUBMIT_STUDENT_ASSIGNMENT_SUCCESS = 'SUBMIT_STUDENT_ASSIGNMENT_SUCCESS',
  SUBMIT_STUDENT_ASSIGNMENT_FAILURE = 'SUBMIT_STUDENT_ASSIGNMENT_FAILURE',

  LOAD_STUDENT_GRADES = 'LOAD_STUDENT_GRADES',
  LOAD_STUDENT_GRADES_SUCCESS = 'LOAD_STUDENT_GRADES_SUCCESS',
  LOAD_STUDENT_GRADES_FAILURE = 'LOAD_STUDENT_GRADES_FAILURE',

  SAVE_PASTE_DETECTION = 'SAVE_PASTE_DETECTION',
  SAVE_PASTE_DETECTION_SUCCESS = 'SAVE_PASTE_DETECTION_SUCCESS',
  SAVE_PASTE_DETECTION_FAILURE = 'SAVE_PASTE_DETECTION_FAILURE',
}

export class LoadStudentAssignments implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENT_ASSIGNMENTS;
}

export class LoadStudentAssignmentsSuccess implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENT_ASSIGNMENTS_SUCCESS;

  constructor(public payload: { assignments: List<AssignmentToPass> }) {
  }
}

export class LoadStudentAssignmentsFailure implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENT_ASSIGNMENTS_FAILURE;
}

export class SubmitStudentAssignment implements Action {
  readonly type = StudentActionTypes.SUBMIT_STUDENT_ASSIGNMENT;

  constructor(public payload: { assignmentResult: AssignmentResult }) {
  }
}

export class SubmitStudentAssignmentSuccess implements Action {
  readonly type = StudentActionTypes.SUBMIT_STUDENT_ASSIGNMENT_SUCCESS;

  constructor(public payload: { submittedAssignmentId: number; grades: List<Assignment> }) {
  }
}

export class SubmitStudentAssignmentFailure implements Action {
  readonly type = StudentActionTypes.SUBMIT_STUDENT_ASSIGNMENT_FAILURE;
}

export class LoadStudentGrades implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENT_GRADES;
}

export class LoadStudentGradesSuccess implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENT_GRADES_SUCCESS;

  constructor(public payload: { grades: List<Assignment> }) {
  }
}

export class LoadStudentGradesFailure implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENT_GRADES_FAILURE;
}

export class SavePasteDetection implements Action {
  readonly type = StudentActionTypes.SAVE_PASTE_DETECTION;

  constructor(public payload: {
    assignmentId: number,
    questionNumber: number,
    value: string
  }) {
  }
}

export class SavePasteDetectionSuccess implements Action {
  readonly type = StudentActionTypes.SAVE_PASTE_DETECTION_SUCCESS;
}

export class SavePasteDetectionFailure implements Action {
  readonly type = StudentActionTypes.SAVE_PASTE_DETECTION_FAILURE;
}


export type StudentActions =
  LoadStudentAssignments
  | LoadStudentAssignmentsSuccess
  | LoadStudentAssignmentsFailure
  | SubmitStudentAssignment
  | SubmitStudentAssignmentSuccess
  | SubmitStudentAssignmentFailure
  | LoadStudentGrades
  | LoadStudentGradesSuccess
  | LoadStudentGradesFailure
  | SavePasteDetection
  | SavePasteDetectionSuccess
  | SavePasteDetectionFailure;
