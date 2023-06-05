import {QuestionType} from '../enums/QuestionType';
import {BaseQuizQuestion} from './quiz.base.question';

export class TextualQuizQuestion extends BaseQuizQuestion {

  readonly type: QuestionType = QuestionType.TEXTUAL;

  serialize(): {} {
    return super.serialize();
  }

  compare(instance: BaseQuizQuestion): number {
    throw Error('Non-sortable');
  }

  static deserialize(question: any): TextualQuizQuestion {
    const textualQuizQuestion = new TextualQuizQuestion();

    textualQuizQuestion.score = question.score;
    textualQuizQuestion.question = question.question;

    return textualQuizQuestion;
  }
}
