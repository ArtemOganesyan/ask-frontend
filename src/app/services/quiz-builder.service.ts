import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Quiz} from '../models/quiz';
import {DEFAULT_PASS_PERCENTAGE, DEFAULT_SCORE, MAX_SCORE_VALUE, MIN_SCORE_VALUE} from '../app.config';
import {MultipleChoiceQuizQuestion} from '../models/quiz.multiple-choice.question';
import {SingleChoiceQuizQuestion} from '../models/quiz.single-choice.question';
import {TextualQuizQuestion} from '../models/quiz.textual.question';
import {QuestionType} from '../enums/QuestionType';
import {List} from 'immutable';
import {FormHelperService} from './form-helper.service';
import {MatDialog} from '@angular/material';
import {ModalConfirmationComponent} from '../components/modals/modal-confirmation/modal-confirmation.component';
import {isUndefined} from '../helpers/utils';
import {answersValidator} from '../helpers/validators';

@Injectable()
export class QuizBuilderService {


  constructor(public formBuilder: FormBuilder, public formHelper: FormHelperService, public dialog: MatDialog) {
  }

  public buildForm(quiz: Quiz = null): FormGroup {
    const form: FormGroup = this.formBuilder.group({
      id: [quiz ? quiz.id : null],
      name: [quiz ? quiz.name : '', [Validators.required, Validators.maxLength(62)]],
      showStopperQuestion: [quiz ? quiz.showStopperQuestion : null],
      passingPercentage: [quiz ? quiz.passingPercentage : DEFAULT_PASS_PERCENTAGE],
      questions: this.formBuilder.array([])
    });

    if (quiz)  {
      quiz.questions.forEach((question, index) => {
        (form.get('questions') as FormArray).push(this.buildFormForQuestion(question, form, index));
      })
    }

    return form;
  }

  public addQuestion(form: FormGroup): void {
    const index = (form.get('questions') as FormArray).length;
    const formGroup = this.buildRawQuestion(null, form, index);

    (form.get('questions') as FormArray).push(formGroup);
  }

  private buildFormForQuestion(question: TextualQuizQuestion | SingleChoiceQuizQuestion | MultipleChoiceQuizQuestion, form: FormGroup, index: number) {
    switch (question.type) {
      case QuestionType.TEXTUAL: {
        return this.buildRawQuestion(question as TextualQuizQuestion, form, index);
      }
      case QuestionType.SINGLE_CHOICE: {
        return this.addSingleChoiceControls(this.buildRawQuestion(question, form, index), question as SingleChoiceQuizQuestion);
      }
      case QuestionType.MULTIPLE_CHOICE: {
        return this.addMultipleChoiceControls(this.buildRawQuestion(question, form, index), question as MultipleChoiceQuizQuestion);
      }
      default: {
        throw Error('Unsupported type of question');
      }
    }
  }

  private buildRawQuestion(question: TextualQuizQuestion | SingleChoiceQuizQuestion | MultipleChoiceQuizQuestion = null, form: FormGroup, index: number) {
    const formGroup: FormGroup = this.formBuilder.group({
      question: [question ? question.question : '', Validators.required],
      score: [String(question ? question.score : DEFAULT_SCORE), [Validators.required, Validators.min(MIN_SCORE_VALUE), Validators.max(MAX_SCORE_VALUE)]],
      type: [question ? question.type : null, Validators.required]
    });

    let prevType = question ? question.type : null;

    formGroup.get('type')
      .valueChanges
      .subscribe((value: QuestionType) => {
        this.formHelper.markEachControlAsClean(formGroup);

        switch (value) {
          case QuestionType.TEXTUAL: {
            const switchType = () => {
              formGroup.removeControl('options');
              formGroup.removeControl('answer');
              formGroup.removeControl('answers');
              formGroup.removeControl('hasOtherOption');

              prevType = value;
            };

            const hasFilledOptions = this.getOptionsList(formGroup)
              .filter(option => option.length > 0)
              .count() > 0;

            return hasFilledOptions
              ? this.dialog
                .open(ModalConfirmationComponent, {
                  width: '20em',
                  data: {
                    text: 'You have some filled options. Do you want to switch question type and lose your data?',
                    action: 'Switch'
                  }
                })
                .afterClosed()
                .subscribe(value => value
                  ? switchType()
                  : formGroup.get('type').setValue(prevType)
                )
              : switchType();
          }

          case QuestionType.SINGLE_CHOICE: {
            let singleChoiceQuestion = new SingleChoiceQuizQuestion();

            if (prevType === QuestionType.MULTIPLE_CHOICE) {
              singleChoiceQuestion.options = this.getOptionsList(formGroup);
              singleChoiceQuestion.hasOtherOption = formGroup.get('hasOtherOption').value;
              formGroup.removeControl('answers');
            }

            prevType = value;

            return this.addSingleChoiceControls(formGroup, singleChoiceQuestion);
          }

          case QuestionType.MULTIPLE_CHOICE: {
            let multipleChoiceQuestion = new MultipleChoiceQuizQuestion();

            if (prevType === QuestionType.SINGLE_CHOICE) {
              multipleChoiceQuestion.options = this.getOptionsList(formGroup);
              multipleChoiceQuestion.hasOtherOption = formGroup.get('hasOtherOption').value;
              formGroup.removeControl('answer');
            }

            if (form.get('showStopperQuestion').value === index) {
              form.get('showStopperQuestion').setValue(null);
            }

            prevType = value;

            return this.addMultipleChoiceControls(formGroup, multipleChoiceQuestion);
          }

          default: {
            return;
          }
        }
      });

    return formGroup;
  }

  private addSingleChoiceControls(form: FormGroup, question: SingleChoiceQuizQuestion): FormGroup {
    form.addControl('options', this.formBuilder.array(question.options
      .map(option => this.formBuilder.group({option: [option, Validators.required]}))
      .toJS()
    ));
    form.addControl('answer', new FormControl(question ? question.answer : null, Validators.required));
    form.addControl('hasOtherOption', new FormControl(question ? question.hasOtherOption : false));

    return form;
  }

  private addMultipleChoiceControls(form: FormGroup, question: MultipleChoiceQuizQuestion = null): FormGroup {
    form.addControl('options', this.formBuilder.array(question.options
      .map(option => this.formBuilder.group({option: [option, Validators.required]}))
      .toJS()
    ));
    form.addControl('answers', new FormControl(question ? question.answers : List(), answersValidator));
    form.addControl('hasOtherOption', new FormControl(question ? question.hasOtherOption : false));

    return form;
  }

  private getOptionsList(formGroup: FormGroup): List<string> {
    return List<string>((formGroup.value.options as Array<{ option: string }> || [])
      .map(obj => obj.option)
    );
  }


  moveQuestionUp(form: FormGroup, questionId: number) {
    const showStopper = form.get('showStopperQuestion').value;

    if (showStopper !== null && showStopper == questionId) {
      form.get('showStopperQuestion').setValue(showStopper - 1);
    }

    const question: FormGroup = (form.get('questions') as FormArray).at(questionId) as FormGroup;

    (form.get('questions') as FormArray).insert(questionId - 1, question);
    (form.get('questions') as FormArray).removeAt(questionId + 1);
  }

  moveQuestionDown(form: FormGroup, questionId: number) {
    const showStopper = form.get('showStopperQuestion').value;

    if (showStopper !== null && showStopper == questionId) {
      form.get('showStopperQuestion').setValue(showStopper + 1);
    }

    const question: FormGroup = (form.get('questions') as FormArray).at(questionId) as FormGroup;

    (form.get('questions') as FormArray).insert(questionId + 2, question);
    (form.get('questions') as FormArray).removeAt(questionId);
  }

  deleteQuestion(form: FormGroup, questionId: number) {
    const showStopper = form.get('showStopperQuestion').value;
    const questions = form.get('questions') as FormArray;


    if (showStopper !== null && showStopper == questionId) {
      form.get('showStopperQuestion').setValue(null);
    } else if (showStopper !== null && questions.length >= showStopper+1 && questions.controls[showStopper+1].get('type').value === QuestionType.MULTIPLE_CHOICE) {
      form.get('showStopperQuestion').setValue(null);
    }

    (form.get('questions') as FormArray).removeAt(questionId);
  }

  serializeForm(formGroup: FormGroup): Quiz {
    const formValue = formGroup.value;
    const quiz = new Quiz();

    quiz.id = formValue.id ? +formValue.id : null;
    quiz.name = formValue.name;
    quiz.passingPercentage = +formValue.passingPercentage;
    quiz.showStopperQuestion = formValue.showStopperQuestion === null ? null : +formValue.showStopperQuestion;
    quiz.totalScore = 0;
    quiz.questions = List(formValue.questions)
      .map((formQuestion: any) => {
        let question = null;

        switch (formQuestion.type) {

          case QuestionType.TEXTUAL: {
            question = new TextualQuizQuestion();
            break;
          }

          case QuestionType.SINGLE_CHOICE: {
            question = new SingleChoiceQuizQuestion();
            question.options = List(formQuestion.options.map(option => option.option)) || question.options;
            question.hasOtherOption = isUndefined(formQuestion.hasOtherOption) ? false : formQuestion.hasOtherOption;
            question.answer = isUndefined(formQuestion.answer) ? question.answer : formQuestion.answer;
            break;
          }

          case QuestionType.MULTIPLE_CHOICE: {
            question = new MultipleChoiceQuizQuestion();
            question.options = List(formQuestion.options.map(option => option.option)) || question.options;
            question.hasOtherOption = isUndefined(formQuestion.hasOtherOption) ? false : formQuestion.hasOtherOption;
            question.answers = isUndefined(formQuestion.answers) ? question.answers : formQuestion.answers;
          }
        }

        if (question === null) {
          return null;
        }

        quiz.totalScore = quiz.totalScore + +formQuestion.score;
        question.question = formQuestion.question;
        question.score = +formQuestion.score;

        return question;
      })
      .filter(question => question !== null)
      .toList();

    return quiz;
  }
}
