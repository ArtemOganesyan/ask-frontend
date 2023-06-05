import {List} from 'immutable';
import {TextualQuizQuestion} from './quiz.textual.question';
import {SingleChoiceQuizQuestion} from './quiz.single-choice.question';
import {MultipleChoiceQuizQuestion} from './quiz.multiple-choice.question';
import {AbstractModel} from './abstract.model';
import {QuestionType} from '../enums/QuestionType';
import {TextualQuizQuestionToPass} from './quiz.textual.question.to.pass';
import {SingleChoiceQuizQuestionToPass} from './quiz.single-choice.question.to.pass';
import {MultipleChoiceQuizQuestionToPass} from './quiz.multiple-choice.question.to.pass';

export class QuizToPass extends AbstractModel {

  public name: string;
  public showStopperQuestion: number;
  public questions: List<QuestionToPass>;

  constructor() {
    super();
    this.questions = List();
  }

  serialize(): any {
    throw Error('Does not support serialization');
  }

  compare(instance: QuizToPass): number {
    throw Error('Non-sortable');
  }

  static deserialize(obj: any): QuizToPass {
    const quizToPass = new QuizToPass();

    quizToPass.name = obj['name'];
    quizToPass.showStopperQuestion = obj['showStopperQuestion'];
    quizToPass.createdAt = new Date(obj['createdAt']);
    quizToPass.updatedAt = new Date(obj['updatedAt']);
    quizToPass.questions = List(obj['questions'].map(question => {
      switch (question.type) {
        case QuestionType.TEXTUAL: {
          return TextualQuizQuestion.deserialize(question);
        }
        case QuestionType.SINGLE_CHOICE: {
          return SingleChoiceQuizQuestion.deserialize(question);
        }
        case QuestionType.MULTIPLE_CHOICE: {
          return MultipleChoiceQuizQuestion.deserialize(question);
        }
      }
    }));

    return quizToPass;
  }

}

export type QuestionToPass = TextualQuizQuestionToPass
  | SingleChoiceQuizQuestionToPass
  | MultipleChoiceQuizQuestionToPass;

