import {QuestionType} from '../enums/QuestionType';
import {AbstractModel} from './abstract.model';

export abstract class BaseQuizQuestion extends AbstractModel {

  public question: string;
  public score: number;
  abstract readonly type: QuestionType;

  constructor() {
    super();
  }

  serialize():{} {
    return {
      type: this.type,
      question: this.question,
      score: this.score
    }
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
