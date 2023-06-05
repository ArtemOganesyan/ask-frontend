import {AbstractModel} from './abstract.model';
import {AssignmentStatus} from '../enums/AssignmentStatus';
import {Quiz} from './quiz';
import {AssignmentResult} from '../enums/AssignmentResult';
import {fromJS, List} from 'immutable';
import * as moment from 'moment';
import {Moment} from 'moment';
import {IQuestionAnswer} from '../interfaces/IQuestionAnswer';
import {AssignmentGradedBy} from '../enums/AssignmentGradedBy';
import {IPasteDetection} from '../interfaces/IPasteDetection';

export class Assignment extends AbstractModel {

  assignmentGroupID: string;
  quiz: Quiz;
  userId: number;
  status: AssignmentStatus;
  result: AssignmentResult;
  gradedBy: AssignmentGradedBy;
  answers: List<IQuestionAnswer>;
  scores: List<number>;
  additionalScores: List<number>;
  pasteDetections: List<IPasteDetection>;
  comments: List<string>;
  summary: string;
  submittedAt: Date = null;
  gradedAt: Date = null;

  serialize(): {} {
    return {};
  }

  compare(instance: Assignment): number {
    return moment(this.submittedAt).isBefore(moment(instance.submittedAt))
      ? -1
      : 1;
  }

  static deserialize(obj: any): Assignment {
    const assignment = new Assignment();

    assignment.id = obj['id'];
    assignment.assignmentGroupID = obj['assignmentGroupID'];
    assignment.quiz = obj['quiz'] ? Quiz.deserialize(obj['quiz']) : null;
    assignment.userId = obj['userId'];
    assignment.status = obj['status'];
    assignment.gradedBy = obj['gradedBy'];
    assignment.result = obj['result'];
    assignment.answers = fromJS(obj['answers']);
    assignment.scores = List(obj['scores']);
    assignment.additionalScores = List(obj['additionalScores']);
    assignment.comments = List(obj['comments']);
    assignment.summary = obj['summary'];
    assignment.submittedAt = obj['submittedAt'] ? new Date(obj['submittedAt']) : null;
    assignment.gradedAt = obj['gradedAt'] ? new Date(obj['gradedAt']) : null;
    assignment.createdAt = new Date(obj['createdAt']);
    assignment.updatedAt = new Date(obj['updatedAt']);
    assignment.pasteDetections = obj['pasteDetections']
      ? List(obj['pasteDetections'].map(item => ({
        value: item.value,
        questionNumber: item.questionNumber,
        createdAt: new Date(item.createdAt)
      })))
      : List();


    return assignment;
  }

  get createdMoment(): Moment {
    return moment(this.createdAt);
  }

  get createdMomentAsString(): string {
    return moment(this.createdAt).format('MM/DD/YY HH:mm');
  }

  get createDateAsString(): string {
    return this.createdMoment.format('MM/DD/YY');
  }

  get submittedTimAsString(): string {
    return this.submittedAt
      ? moment(this.submittedAt).format('MM/DD/YY HH:mm')
      : 'Not sumbitted';
  }

  get gradedTimeAsString(): string {
    if (!this.submittedAt) {
      return '-';
    }
    return this.gradedAt
      ? moment(this.gradedAt).format('MM/DD/YY HH:mm')
      : 'Automatic';
  }

  get autoGradedPoints(): number {
    return this.scores.reduce((acc, next) => acc + next, 0);
  }

  get totalGradedPoints(): number {
    return this.autoGradedPoints + (this.additionalScores
      ? this.additionalScores.reduce((acc, next) => acc + next, 0)
      : 0);
  }

  getAssignmentStatus(): string {
    switch (this.status) {
      case AssignmentStatus.ASSIGNED: {
        return 'Pending Submission';
      }

      case AssignmentStatus.SUBMITTED: {
        return 'Pending Review';
      }

      case AssignmentStatus.GRADED: {
        if (this.result === AssignmentResult.PASSED) {
          return 'PASSED';
        } else {
          return 'FAILED';
        }
      }
    }
  }

  isSubmitted(): boolean {
    return this.status === AssignmentStatus.SUBMITTED;
  }

  isGraded(): boolean {
    return this.status === AssignmentStatus.GRADED;
  }

  gradedByString(): string {
    switch (this.gradedBy) {
      case AssignmentGradedBy.NONE: {
        return '-';
      }

      case AssignmentGradedBy.AUTOMATIC: {
        return 'Auto';
      }

      case AssignmentGradedBy.TEACHER: {
        return 'Teacher';
      }
    }
  }

  isPassed(): boolean {
    return this.result === AssignmentResult.PASSED;
  }

  isFailed(): boolean {
    return this.result === AssignmentResult.FAILED;
  }

  isPending(): boolean {
    return this.result === AssignmentResult.PENDING;
  }

  isAutoGraded(): boolean {
    return this.gradedBy === AssignmentGradedBy.AUTOMATIC;
  }

  isTeacherReviewed(): boolean {
    return this.gradedBy === AssignmentGradedBy.TEACHER;
  }

  hasPastesForQuestion(questionNumber: number): boolean {
    return this.getPastesForQuestion(questionNumber).count() > 0;
  }

  getPastesForQuestion(questionNumber: number): List<IPasteDetection> {
    return this.pasteDetections
      .filter(paste => paste.questionNumber === questionNumber)
      .toList();
  }

  isPassing(totalAdditionalPoints): boolean {
    return this.autoGradedPoints + totalAdditionalPoints >= this.quiz.passingScore;
  }

}
