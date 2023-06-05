import {List} from 'immutable';
import {IOption} from '../interfaces/IOption';
import {QuestionType} from '../enums/QuestionType';

export const questionTypeOptions = List<IOption>([
  {
    value: QuestionType.TEXTUAL,
    label: 'Textual',
  },
  {
    value: QuestionType.SINGLE_CHOICE,
    label: 'Single-Choice'
  },
  {
    value: QuestionType.MULTIPLE_CHOICE,
    label: 'Multiple-Choice'
  }
]);
