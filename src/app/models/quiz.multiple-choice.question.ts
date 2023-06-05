import {QuestionType} from '../enums/QuestionType';
import {BaseQuizQuestion} from './quiz.base.question';
import {List, Repeat} from 'immutable';
import {MIX_QUESTION_OPTIONS} from '../app.config';

export class MultipleChoiceQuizQuestion extends BaseQuizQuestion {

  readonly type: QuestionType = QuestionType.MULTIPLE_CHOICE;
  public options: List<string> = Repeat('', MIX_QUESTION_OPTIONS).toList();
  public answers: List<number> = List();
  public hasOtherOption: boolean;

  serialize(): {} {
    return {
      ...super.serialize(),
      options: this.options.toJS(),
      answers: this.answers.toJS(),
      hasOtherOption: this.hasOtherOption
    };
  }

  compare(instance: MultipleChoiceQuizQuestion): number {
    throw Error('Non-sortable');
  }

  static deserialize(question: any): MultipleChoiceQuizQuestion {
    const multipleChoiceQuizQuestion = new MultipleChoiceQuizQuestion();

    multipleChoiceQuizQuestion.score = question.score;
    multipleChoiceQuizQuestion.question = question.question;
    multipleChoiceQuizQuestion.options = List(question.options);
    multipleChoiceQuizQuestion.answers = List(question.answers);
    multipleChoiceQuizQuestion.hasOtherOption = question.hasOtherOption;

    return multipleChoiceQuizQuestion;
  }

  public getScorePerPoint(): number {
    return Math.ceil((this.score / this.answers.count()) * 10)/10;
  }

}
