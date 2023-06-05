import {QuestionType} from '../enums/QuestionType';
import {AbstractModel} from './abstract.model';

export abstract class BaseQuizQuestionToPass extends AbstractModel {

  public question: string;
  abstract readonly type: QuestionType;

  constructor() {
    super();
  }

  serialize(): {} {
    throw Error('Does not support serialization');
  }

  isTextual(): boolean {
    return this.type === QuestionType.TEXTUAL;
  }

  isSingleChoice(): boolean {
    return this.type === QuestionType.SINGLE_CHOICE;
  }

  isMultipleChoice(): boolean {
    return this.type === QuestionType.MULTIPLE_CHOICE;
  }

}
