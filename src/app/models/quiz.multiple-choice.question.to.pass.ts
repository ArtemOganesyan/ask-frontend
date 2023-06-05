import {QuestionType} from '../enums/QuestionType';
import {List, Repeat} from 'immutable';
import {MIX_QUESTION_OPTIONS} from '../app.config';
import {BaseQuizQuestionToPass} from './quiz.base.question.to.pass';

export class MultipleChoiceQuizQuestionToPass extends BaseQuizQuestionToPass {

  readonly type: QuestionType = QuestionType.MULTIPLE_CHOICE;
  public options: List<string> = Repeat('', MIX_QUESTION_OPTIONS).toList();
  public hasOtherOption: boolean;

  serialize(): {} {
    throw Error('Does not support serialization');
  }

  compare(instance: MultipleChoiceQuizQuestionToPass): number {
    throw Error('Non-sortable');
  }

  static deserialize(question: any): MultipleChoiceQuizQuestionToPass {
    const multipleChoiceQuizQuestionToPass = new MultipleChoiceQuizQuestionToPass();

    multipleChoiceQuizQuestionToPass.question = question.question;
    multipleChoiceQuizQuestionToPass.options = List(question.options);
    multipleChoiceQuizQuestionToPass.hasOtherOption = question.hasOtherOption;

    return multipleChoiceQuizQuestionToPass;
  }

}
