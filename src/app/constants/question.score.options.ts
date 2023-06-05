import {List, Range} from 'immutable';
import {IOption} from '../interfaces/IOption';
import {MAX_SCORE_VALUE, MIN_SCORE_VALUE} from '../app.config';

export const questionScoreOptions:List<IOption> = Range(MIN_SCORE_VALUE, MAX_SCORE_VALUE +1)
  .map(number => ({
    value: number + '',
    label: number + ''
  }))
  .toList();

