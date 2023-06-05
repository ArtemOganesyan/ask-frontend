import {QuestionType} from '../enums/QuestionType';
import {BaseQuizQuestion} from './quiz.base.question';
import {BaseQuizQuestionToPass} from './quiz.base.question.to.pass';

export class TextualQuizQuestionToPass extends BaseQuizQuestionToPass {

  readonly type: QuestionType = QuestionType.TEXTUAL;

  serialize(): {} {
    throw Error('Does not support serialization');
  }

  compare(instance: TextualQuizQuestionToPass): number {
    throw Error('Non-sortable');
  }

  static deserialize(question: any): TextualQuizQuestionToPass {
    const textualQuizQuestionToPass = new TextualQuizQuestionToPass();

    textualQuizQuestionToPass.question = question.question;

    return textualQuizQuestionToPass;
  }
}
