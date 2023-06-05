import {AbstractModel} from './abstract.model';
import {AssignmentStatus} from '../enums/AssignmentStatus';
import {Quiz} from './quiz';
import {AssignmentResult} from '../enums/AssignmentResult';
import {fromJS, List} from 'immutable';
import {Moment} from 'moment';
import * as moment from 'moment';
import {IQuestionAnswer} from '../interfaces/IQuestionAnswer';


/**
 * Class represents Assignment that Student need to Pass
 * (status = ASSIGNED)
 */
export class AssignmentToPass extends AbstractModel {

  readonly status = AssignmentStatus.ASSIGNED;

  quiz: Quiz;

  serialize(): {} {
    throw Error('Does not support serialization');
  }

  compare(instance: AssignmentToPass): number {
    return this.createdMoment.isBefore(instance.createdMoment) ? 1 : -1;
  }

  static deserialize(obj: any): AssignmentToPass {
    const assignment = new AssignmentToPass();

    assignment.id = obj['id'];
    assignment.quiz = obj['quiz'] ? Quiz.deserialize(obj['quiz']) : null;
    assignment.createdAt = new Date(obj['createdAt']);
    assignment.updatedAt = new Date(obj['updatedAt']);

    return assignment;
  }
}
