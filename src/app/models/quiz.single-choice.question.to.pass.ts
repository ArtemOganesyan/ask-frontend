import {QuestionType} from '../enums/QuestionType';
import {BaseQuizQuestion} from './quiz.base.question';
import {List, Repeat} from 'immutable';
import {MIX_QUESTION_OPTIONS} from '../app.config';
import {BaseQuizQuestionToPass} from './quiz.base.question.to.pass';
import {MultipleChoiceQuizQuestionToPass} from './quiz.multiple-choice.question.to.pass';

export class SingleChoiceQuizQuestionToPass extends BaseQuizQuestionToPass {

  readonly type: QuestionType = QuestionType.SINGLE_CHOICE;
  public options: List<string> = Repeat('', MIX_QUESTION_OPTIONS).toList();
  public hasOtherOption: boolean;

  serialize(): {} {
    throw Error('Does not support serialization');
  }

  compare(instance: SingleChoiceQuizQuestionToPass): number {
    throw Error('Non-sortable');
  }

  static deserialize(question: any): SingleChoiceQuizQuestionToPass {
    const singleChoiceQuizQuestionToPass = new SingleChoiceQuizQuestionToPass();

    singleChoiceQuizQuestionToPass.question = question.question;
    singleChoiceQuizQuestionToPass.options = List(question.options);
    singleChoiceQuizQuestionToPass.hasOtherOption = question.hasOtherOption;

    return singleChoiceQuizQuestionToPass;
  }

}
