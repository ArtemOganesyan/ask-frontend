import {QuestionType} from '../enums/QuestionType';
import {BaseQuizQuestion} from './quiz.base.question';
import {List, Repeat} from 'immutable';
import {MIX_QUESTION_OPTIONS} from '../app.config';

export class SingleChoiceQuizQuestion extends BaseQuizQuestion {

  readonly type: QuestionType = QuestionType.SINGLE_CHOICE;
  public options: List<string> = Repeat('', MIX_QUESTION_OPTIONS).toList();
  public answer: number;
  public hasOtherOption: boolean;

  serialize(): {} {
    return {
      ...super.serialize(),
      options: this.options.toJS(),
      answer: this.answer,
      hasOtherOption: this.hasOtherOption
    };
  }

  compare(instance: SingleChoiceQuizQuestion): number {
    throw Error('Non-sortable');
  }

  static deserialize(question: any): SingleChoiceQuizQuestion {
    const singleChoiceQuizQuestion = new SingleChoiceQuizQuestion();

    singleChoiceQuizQuestion.score = question.score;
    singleChoiceQuizQuestion.question = question.question;
    singleChoiceQuizQuestion.options = List(question.options);
    singleChoiceQuizQuestion.answer = question.answer;
    singleChoiceQuizQuestion.hasOtherOption = question.hasOtherOption;

    return singleChoiceQuizQuestion;
  }

}
