import {List} from 'immutable';
import {TextualQuizQuestion} from './quiz.textual.question';
import {SingleChoiceQuizQuestion} from './quiz.single-choice.question';
import {MultipleChoiceQuizQuestion} from './quiz.multiple-choice.question';
import {AbstractModel} from './abstract.model';
import {QuestionType} from '../enums/QuestionType';

export class Quiz extends AbstractModel {

  public name: string;
  public totalScore: number; // Automatically calculated field
  public passingPercentage: number;
  public showStopperQuestion: number;
  public questions: List<TextualQuizQuestion | SingleChoiceQuizQuestion | MultipleChoiceQuizQuestion>;

  constructor() {
    super();
    this.questions = List();
  }

  serialize(): any {
    return {
      id: this.id,
      name: this.name,
      totalScore: this.totalScore,
      passingPercentage: this.passingPercentage,
      showStopperQuestion: this.showStopperQuestion,
      questions: this.questions.map(question => question.serialize()).toJS(),
      createdAt: this.createdAt ? this.createdAt.toISOString() : null,
      updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null
    };
  }

  static deserialize(obj: any): Quiz {
    const quiz = new Quiz();

    quiz.id = obj['id'];
    quiz.name = obj['name'];
    quiz.totalScore = obj['totalScore'];
    quiz.passingPercentage = obj['passingPercentage'];
    quiz.showStopperQuestion = obj['showStopperQuestion'];
    quiz.createdAt = new Date(obj['createdAt']);
    quiz.updatedAt = new Date(obj['updatedAt']);
    quiz.questions = List(obj['questions'].map(question => {
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

    return quiz;
  }

  compare(instance: Quiz): number {
    return this.name.localeCompare(instance.name);
  }

  get passingScore(): number {
    return Math.floor(this.totalScore * this.passingPercentage / 100);
  }

}
