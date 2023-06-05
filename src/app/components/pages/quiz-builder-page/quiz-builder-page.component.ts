import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {FormHelperService} from '../../../services/form-helper.service';
import {QuizBuilderService} from '../../../services/quiz-builder.service';
import {Quiz} from '../../../models/quiz';
import {List} from 'immutable';
import {questionScoreOptions} from '../../../constants/question.score.options';
import {IOption} from '../../../interfaces/IOption';
import {AcErrorStateMatcher} from '../../../helpers/AcErrorStateMatcher';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ModalConfirmationComponent} from '../../modals/modal-confirmation/modal-confirmation.component';
import {ActivatedRoute, CanDeactivate, Router} from '@angular/router';
import {DataSelectors} from '../../../store/selectors/data.selectors';
import {Subscription} from 'rxjs/Subscription';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {LoadQuizzes, SaveQuiz} from '../../../store/actions/data.actions';
import {ShowNotificationError} from '../../../store/actions/notification.actions';
import {QuizPreviewComponent} from '../../modals/quiz-preview/quiz-preview.component';
import {LocalStorageService} from '../../../services/local-storage.service';
import {ComponentCanDeactivate} from '../../../guards/pending-changes.guard';
import {timer} from 'rxjs/observable/timer';

@Component({
  selector: 'ac-quiz-builder-page',
  templateUrl: './quiz-builder-page.component.html',
  styleUrls: ['./quiz-builder-page.component.scss']
})
export class QuizBuilderPageComponent implements OnInit, OnDestroy, CanDeactivate<ComponentCanDeactivate>, AfterViewInit {

  public questions: FormArray;
  public form: FormGroup;
  public questionScoreOptions: List<IOption> = questionScoreOptions;
  public titleEverWasValid = false;
  public matcher = new AcErrorStateMatcher();
  public openedQuestion = null;

  public readonly passingPercentage: number = 100;
  public totalScore$: Observable<number>;
  private routerSubscription: Subscription;
  private trackingChanges: Subscription;
  private isRestored: boolean = false;

  constructor(public quizBuilderService: QuizBuilderService,
              public fh: FormHelperService,
              public dialog: MatDialog,
              public activatedRoute: ActivatedRoute,
              public dataSelectors: DataSelectors,
              public store: Store<GlobalState>,
              public router: Router,
              public localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadQuizzes());
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();

    if (this.trackingChanges) {
      this.trackingChanges.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    // Load Quiz data into form
    const loadQuiz$ = this.localStorageService.getQuiz()
      ? timer(500).switchMap(() => this.dialog
        .open(ModalConfirmationComponent, {
          width: '30em',
          data: {
            text: 'You have unsaved Quiz you\'ve worked on earlier. Would you like to restore it? (If you disagree data will be lost)',
            action: 'Restore'
          }
        })
        .afterClosed()
        .map((shouldRestore: boolean) => shouldRestore ? this.localStorageService.getQuiz() : null)
        .do((quiz: Quiz) => this.isRestored = quiz !== null))
      : of(null);

    const id$ = this.activatedRoute.params
      .map(params => params.hasOwnProperty('id') ? Number(params['id']) : null);

    this.routerSubscription = timer(500)
      .switchMap(() => loadQuiz$)
      .combineLatest(id$, this.dataSelectors.quizzes$)
      .map(([quiz, id, quizzes]: [Quiz, number, List<Quiz>]) => quiz || quizzes.find(item => item.id == id) || null)
      .subscribe(quiz => this.rebuildForm(quiz));
  }

  rebuildForm(quiz: Quiz) {
    this.form = this.quizBuilderService.buildForm(quiz);

    const totalScore = (formValue) => (formValue.questions as any[])
      .reduce((acc: number, question: any) => {
        return acc + Number(question.score);
      }, 0);

    this.totalScore$ = this.form.valueChanges
      .map((value: any) => totalScore(value))
      .merge(of(totalScore(this.form.value)));

    this.trackingChanges = this.form.valueChanges.subscribe(() => {
      if (this.form.touched) {
        this.localStorageService.setQuiz(this.quizBuilderService.serializeForm(this.form));
      }
    });
  }

  addQuestion(): void {
    this.quizBuilderService.addQuestion(this.form);
    this.openedQuestion = this.questionsCount() - 1;
  }

  setShowStopper(checked: boolean, questionId: string) {
    this.form.get('showStopperQuestion').setValue(checked ? +questionId : null);
  }

  moveQuestionUp(questionId: string) {
    this.quizBuilderService.moveQuestionUp(this.form, +questionId);
    this.openedQuestion = this.openedQuestion - 1;
    this.fh.markEachControlAsDirty(this.form);
  }

  moveQuestionDown(questionId: string) {
    this.quizBuilderService.moveQuestionDown(this.form, +questionId);
    this.openedQuestion = this.openedQuestion + 1;
    this.fh.markEachControlAsDirty(this.form);
  }

  deleteQuestion(questionId: string) {
    this.dialog
      .open(ModalConfirmationComponent, {
        width: '30em',
        data: {
          text: 'Are you sure want to DELETE this question?',
          action: 'Delete'
        }
      })
      .afterClosed()
      .filter(value => value === true)
      .subscribe(() => this.quizBuilderService.deleteQuestion(this.form, +questionId));

    this.fh.markEachControlAsDirty(this.form);
  }

  isShowStopper(questionId: string): boolean {
    return this.form.get('showStopperQuestion').value === +questionId;
  }

  getQuestionHeader(questionId: string): string {
    const text = (this.form.get('questions') as FormArray).controls[questionId].get('question').value || 'new empty question';

    return `Q${+questionId + 1}${this.isShowStopper(questionId) ? '*' : ''}: ${text}`;
  }

  isFormHaveQuestions(): boolean {
    return (this.form.get('questions') as FormArray).length > 0;
  }

  shouldShowAddQuestionButton(): boolean {
    this.titleEverWasValid = this.titleEverWasValid || this.form.get('name').valid;

    return this.titleEverWasValid;
  }

  questionsCount(): number {
    return (this.form.get('questions') as FormArray).length;
  }

  preview(): void {
    this.fh.markEachControlAsTouched(this.form);
    this.fh.markEachControlAsDirty(this.form);

    if (this.form.valid) {
      const quiz: Quiz = this.quizBuilderService.serializeForm(this.form);

      this.dialog
        .open(QuizPreviewComponent, {
          data: {quiz},
          width: '50em',
          height: '90%'
        })
        .afterClosed()
        .subscribe(() => {
        });
    } else {
      this.store.dispatch(new ShowNotificationError({message: 'Quiz is not completed. Check highlighted with "red" areas'}));
    }
  }

  submit(): void {
    this.fh.markEachControlAsTouched(this.form);
    this.fh.markEachControlAsDirty(this.form);

    if (this.form.valid) {
      this.isRestored = false;
      this.store.dispatch(new SaveQuiz({quiz: this.quizBuilderService.serializeForm(this.form)}));
    } else {
      this.store.dispatch(new ShowNotificationError({message: 'Quiz is not completed. Check highlighted with "red" areas'}));
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty || this.isRestored) {
      return this.dialog
        .open(ModalConfirmationComponent, {
          width: '30em',
          data: {
            text: 'You have unsaved changes in your Quiz. Would you like to leave Quiz and discard changes?',
            action: 'Discard'
          }
        })
        .afterClosed()
        .do(value => value ? this.localStorageService.clearQuiz() : null);
    } else {
      return true;
    }

  }

}
