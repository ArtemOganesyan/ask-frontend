import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MultipleChoiceQuizQuestion} from '../models/quiz.multiple-choice.question';
import {SingleChoiceQuizQuestion} from '../models/quiz.single-choice.question';
import {TextualQuizQuestion} from '../models/quiz.textual.question';
import {QuestionType} from '../enums/QuestionType';
import {List, Set} from 'immutable';
import {AssignmentResult} from '../models/assignment.result';
import {IQuestionAnswer} from '../interfaces/IQuestionAnswer';
import {QuestionToPass, QuizToPass} from '../models/quiz.to.pass';
import {TextualQuizQuestionToPass} from '../models/quiz.textual.question.to.pass';
import {SingleChoiceQuizQuestionToPass} from '../models/quiz.single-choice.question.to.pass';
import {MultipleChoiceQuizQuestionToPass} from '../models/quiz.multiple-choice.question.to.pass';

@Injectable()
export class TakeQuizService {

  constructor(public formBuilder: FormBuilder) {
  }

  buildForm(quiz: QuizToPass, noValidation: boolean = false): FormGroup {
    return this.formBuilder.group({
      'questions': this.formBuilder.array(quiz.questions.map(question => this.buildQuestion(question, noValidation)).toJS())
    });
  }

  private buildQuestion(question: QuestionToPass, noValidation: boolean) {
    switch (question.type) {

      case QuestionType.TEXTUAL: {
        return this.formBuilder.group({
          textAnswer: ['', noValidation ? [] : Validators.required]
        });
      }

      case QuestionType.SINGLE_CHOICE: {
        return this.formBuilder.group({
          answer: ['', noValidation ? [] : Validators.required],
          textAnswer: ['']
        });
      }

      case QuestionType.MULTIPLE_CHOICE: {
        return this.formBuilder.group({
          answers: [Set(), noValidation ? [] : this.atLeastOneValue.bind(this)],
          textAnswer: ['']
        });
      }
    }
  }

  private atLeastOneValue(control: FormControl) {
    let email = control.value;
    if (!control.value || !Set.isSet(control.value) || (Set(control.value).toList().count() === 0)) {
      return {
        required: true
      };
    }
    return null;
  }

  serializeForm(form: FormGroup, assignmentId: number): AssignmentResult {
    const assignmentResult = new AssignmentResult();

    assignmentResult.assignmentId = assignmentId;
    assignmentResult.answers = List(form.value.questions.map((answer: any) => {
      const obj: IQuestionAnswer = {answer: null, textAnswer: null};

      if (answer.hasOwnProperty('textAnswer')) {
        obj.textAnswer = answer.textAnswer;
      }

      if (answer.hasOwnProperty('answer')) {
        obj.answer = answer.answer;
      }

      if (answer.hasOwnProperty('answers')) {
        obj.answer = (answer.answers as Set<number>).toList();
      }

      return obj;
    }));

    return assignmentResult;

  }
}
