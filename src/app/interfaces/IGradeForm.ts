import {List} from 'immutable';
import {AssignmentResult} from '../enums/AssignmentResult';

export interface IGradeForm {
  grades: List<{ comment: string; additionalScore: number }>;
  summary: string;
  result: AssignmentResult;
}
