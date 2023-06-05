import {List} from 'immutable';
import {AbstractModel} from '../models/abstract.model';

export class ReduxHelper {

  static sort<T extends AbstractModel>(list: List<T>): List<T> {
    return list.sort((a,b) => a.compare(b)).toList();
  }
}
