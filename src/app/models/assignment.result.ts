import {AbstractModel} from './abstract.model';
import {List} from 'immutable';
import {IQuestionAnswer} from '../interfaces/IQuestionAnswer';

export class AssignmentResult extends AbstractModel {

  assignmentId: number;
  answers: List<IQuestionAnswer>;

  serialize(): {} {
    return {
      assignmentId: this.assignmentId,
      answers: this.answers
        .map(answer => ({
          textAnswer: answer.textAnswer,
          answer: List.isList(answer.answer) ? (answer.answer as List<number>).toJS() : answer.answer
        }))
        .toJS()
    };
  }

  compare(instance: AssignmentResult): number {
    throw Error('Not Implemented');
  }
}
