import {List} from 'immutable';

export interface IQuestionAnswer {
  answer?: List<number> | number | string;
  textAnswer?: string;
}
