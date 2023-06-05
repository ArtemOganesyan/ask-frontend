import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { List } from 'immutable';
import { questionTypeOptions } from '../../../constants/question.type.options';
import { QuestionType } from '../../../enums/QuestionType';
import { AcErrorStateMatcher } from '../../../helpers/AcErrorStateMatcher';
import { IOption } from '../../../interfaces/IOption';
import { FormHelperService } from '../../../services/form-helper.service';

const MAX_MULTIPLE_CHOICE = 15;

@Component({
  selector: 'ac-question-body-form',
  templateUrl: './question-body-form.component.html',
  styleUrls: ['./question-body-form.component.scss'],
})
export class QuestionBodyFormComponent implements OnInit {

  @Input() questionBodyForm: FormGroup;
  @Input() isShowStopper: boolean;
  @Output() setShowStopper: EventEmitter<boolean> = new EventEmitter();

  questionTypeOptions: List<IOption> = questionTypeOptions;
  matcher = new AcErrorStateMatcher();

  maxMultipleChoice = MAX_MULTIPLE_CHOICE;

  constructor(
    public readonly fh: FormHelperService,
    private readonly formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
  }

  isTextualQuestion(): boolean {
    return this.questionBodyForm.get('type').value === QuestionType.TEXTUAL;
  }

  isSingleChoiceQuestion(): boolean {
    return this.questionBodyForm.get('type').value === QuestionType.SINGLE_CHOICE;
  }

  isMultipleChoiceQuestion(): boolean {
    return this.questionBodyForm.get('type').value === QuestionType.MULTIPLE_CHOICE;
  }

  optionsCount(): number {
    return (this.questionBodyForm.get('options') as FormArray).length;
  }

  get optionsLength():number {
    return (this.questionBodyForm.get('options') as FormArray).controls.length;
  }

  addOption(): void {
    (this.questionBodyForm.get('options') as FormArray)
      .push(this.formBuilder.group({ option: ['', Validators.required] }));
  }

  deleteOption(optionId: string): void {
    const [options, type] = [this.questionBodyForm.get('options') as FormArray, this.questionBodyForm.get('type').value];

    options.removeAt(+optionId);

    if (type === QuestionType.MULTIPLE_CHOICE) {
      this.removeOptionFromAnswers(optionId);
    } else if (type === QuestionType.SINGLE_CHOICE) {
      this.recheckAnswer(+optionId);
    }
    this.fh.markEachControlAsDirty(this.questionBodyForm);
  }

  setMultipleChoice(event: MatCheckboxChange, optionId: string) {
    const answers: List<number> = this.questionBodyForm.get('answers').value;

    (this.questionBodyForm.get('answers') as FormGroup).setValue(event.checked
      ? answers.push(+optionId)
      : answers.remove(answers.indexOf(+optionId)),
    );

    (this.questionBodyForm.get('answers') as FormGroup).markAsUntouched();
    (this.questionBodyForm.get('answers') as FormGroup).markAsDirty();
  }

  isChoiceSelected(optionId: string): boolean {
    return this.questionBodyForm.get('answers').value.indexOf(+optionId) !== -1;
  }

  moveOptionUp(optionId: number, from?: string) {
    const options = this.questionBodyForm.get('options') as FormArray;
    const value = (options.at(optionId) as FormGroup).get('option').value;

    (options.at(optionId) as FormGroup).get('option').setValue(
      (options.at(optionId - 1) as FormGroup).get('option').value);

    (options.at(optionId - 1) as FormGroup).get('option').setValue(value);

    switch (from) {
      case 'radio': {
        this.setAnswer(optionId - 1);
        break;
      }

      case 'chbs': {
        this.setAnswers(optionId, true);
        break;
      }

      default: {
        break;
      }
    }

    this.fh.markEachControlAsDirty(this.questionBodyForm);
  }

  moveOptionDown(optionId: number, from?: string) {
    const options = this.questionBodyForm.get('options') as FormArray;
    const value = (options.at(optionId) as FormGroup).get('option').value;

    (options.at(optionId) as FormGroup).get('option').setValue(
      (options.at(optionId + 1) as FormGroup).get('option').value);

    (options.at(optionId + 1) as FormGroup).get('option').setValue(value);

    switch (from) {
      case 'radio': {
        this.setAnswer(optionId + 1);
        break;
      }

      case 'chbs': {
        this.setAnswers(optionId, false);
        break;
      }

      default: {
        break;
      }
    }

    this.fh.markEachControlAsDirty(this.questionBodyForm);
  }

  isOptionChecked(optionId): boolean {
    return this.questionBodyForm.get('answer').value === optionId;
  }

  private removeOptionFromAnswers(optionId): void {
    const answers: List<number> = this.questionBodyForm.get('answers').value
      .map(value => value === +optionId
        ? null
        : value > +optionId
          ? value - 1
          : value,
      )
      .filter(value => value !== null);

    (this.questionBodyForm.get('answers') as FormGroup).setValue(answers);
  }

  private setAnswer(optionId: number) {
    const answerControl = this.questionBodyForm.get('answer');
    answerControl.setValue(optionId);
  }

  private setAnswers(optionId: number | string, isUp: boolean) {
    const options = this.questionBodyForm.get('options') as FormArray;
    const answers: List<number> = this.questionBodyForm.get('answers').value;
    const res: List<{ [key: string]: number }> = List(options.value).map((value, index) => {
      return { [index]: ((answers.indexOf(index) !== -1) ? index : -1) };
    }).toList();
    const currentPos = +optionId;
    const current = res.get(currentPos);
    const neighbourPos = currentPos + ((isUp) ? -1 : 1);
    const t1 = res.remove(currentPos);
    const t2 = t1.insert(neighbourPos, current);

    (this.questionBodyForm.get('answers') as FormGroup).setValue(
      List(t2.reduce((acc, item, index) => {
        if (Object.values(item)[0] !== -1) {
          acc.push(index);
        }
        return acc;
      }, [])),
    );

    (this.questionBodyForm.get('answers') as FormGroup).markAsUntouched();
    (this.questionBodyForm.get('answers') as FormGroup).markAsDirty();
  }

  private recheckAnswer(optionId: number) {
    const answerControl = this.questionBodyForm.get('answer');

    if (answerControl.value === optionId) {
      answerControl.setValue(null);
    } else if (answerControl.value > optionId) {
      setTimeout(() => answerControl.setValue(answerControl.value - 1), 0); // Something weird is going here...
    }
  }
}
