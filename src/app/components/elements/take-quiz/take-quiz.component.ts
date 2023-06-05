import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz';
import {TakeQuizService} from '../../../services/take-quiz.service';
import {FormArray, FormGroup} from '@angular/forms';
import {FormHelperService} from '../../../services/form-helper.service';
import {AssignmentResult} from '../../../models/assignment.result';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {ShowNotificationError} from '../../../store/actions/notification.actions';
import {QuizToPass} from '../../../models/quiz.to.pass';

@Component({
  selector: 'ac-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TakeQuizComponent implements OnInit {

  @Input() quiz: QuizToPass;
  @Input() assignmentId: number = null;
  @Input() isPreview: boolean = false;
  @Output() submitForm: EventEmitter<AssignmentResult> = new EventEmitter<AssignmentResult>();

  public form: FormGroup;

  constructor(public takeQuizService: TakeQuizService, public fh: FormHelperService, public store: Store<GlobalState>) {
  }

  ngOnInit() {
    this.form = this.takeQuizService.buildForm(this.quiz, this.isPreview);
  }

  getQuestionsFormControls(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  public submit() {
    if (this.form.invalid) {
      this.fh.markEachControlAsDirty(this.form);
      return this.store.dispatch(new ShowNotificationError({message: 'Assignment isn\'t complete. Check for the errors'}));
    }

    this.submitForm.next(this.takeQuizService.serializeForm(this.form, this.assignmentId));
  }

}
