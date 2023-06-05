import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Assignment} from '../../../models/assignment';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../models/user';
import {List} from 'immutable';
import {IGradeForm} from '../../../interfaces/IGradeForm';
import {AssignmentResult} from '../../../enums/AssignmentResult';
import {MatDialog} from '@angular/material';
import {PasteDetectionComponent} from '../../modals/paste-detection/paste-detection.component';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ac-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradeFormComponent implements OnInit {

  public isStaging: boolean = environment.isStaging;

  @Input() assignment: Assignment = null;
  @Input() users: List<User>;
  @Input() isStudent: boolean = false;
  @Input() backScreen = '';
  @Output() gradeSubmit: EventEmitter<IGradeForm> = new EventEmitter<IGradeForm>();

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      grades: this.formBuilder.array(this.assignment.quiz.questions.map((_, index) =>
        this.formBuilder.group({
          comment: [this.assignment.comments.get(index) || ''],
          additionalScore: [this.assignment.additionalScores.get(index) || 0]
        })).toJS()),
      summary: [this.assignment.summary]
    });
  }

  submit(): void {
    const formValue = this.form.value;

    this.gradeSubmit.next({
      grades: List(formValue.grades
        .map(grade => ({comment: grade.comment, additionalScore: Number(grade.additionalScore)}))
      ),
      summary: formValue.summary,
      result: (this.assignment.autoGradedPoints + this.totalAdditionalPoints >= this.assignment.quiz.passingScore) && this.isPassingShowStopper
        ? AssignmentResult.PASSED
        : AssignmentResult.FAILED
    });
  }

  canIncrease(index: number): boolean {
    return this.additionalScore(index) + this.assignment.scores.get(index) < this.assignment.quiz.questions.get(index).score;
  }

  increase(index: number) {
    this.getAdditionalScoreControl(index).setValue(this.additionalScore(index) + 1);
  }

  canDecrease(index: number): boolean {
    return this.additionalScore(index) > 0;
  }

  decrease(index: number) {
    this.getAdditionalScoreControl(index).setValue(this.additionalScore(index) - 1);
  }

  getAdditionalScoreControl(index: number): AbstractControl {
    return (this.form.get('grades') as FormArray).controls[index].get('additionalScore');
  }

  getCommentControl(index: number): AbstractControl {
    return (this.form.get('grades') as FormArray).controls[index].get('comment');
  }

  additionalScore(index: number): number {
    return Number(this.getAdditionalScoreControl(index).value);
  }

  showPastes(index: number): void {
    this.dialog
      .open(PasteDetectionComponent, {
        width: '50em',
        data: {
          pastes: this.assignment.getPastesForQuestion(index)
        }
      })
      .afterClosed()
      .subscribe(() => {
      });
  }


  get userName(): string {
    return (this.users.find(user => user.id === this.assignment.userId) || {name: ''}).name;
  }

  get userGroup(): string {
    return (this.users.find(user => user.id === this.assignment.userId) || {group: ''}).group;
  }

  get totalAdditionalPoints(): number {
    return this.assignment.quiz.questions.reduce((acc, next, index) => acc + this.additionalScore(index), 0);
  }

  get totalPercentage(): number {
    return Math.ceil((this.totalAdditionalPoints + this.assignment.autoGradedPoints) * 100 / this.assignment.quiz.totalScore);
  }

  get isPassingShowStopper(): boolean {
    const showStopper = this.assignment.quiz.showStopperQuestion;

    if (showStopper === null) {
      return true;
    }

    console.log(`${this.assignment.scores.get(showStopper) + this.additionalScore(showStopper)} === ${this.assignment.quiz.questions.get(showStopper).score}`);
    return this.assignment.scores.get(showStopper) + this.additionalScore(showStopper) === this.assignment.quiz.questions.get(showStopper).score;
  }

}
