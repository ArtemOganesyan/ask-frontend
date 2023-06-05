import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Quiz } from '../../../models/quiz';
import { User } from '../../../models/user';
import { FormHelperService } from '../../../services/form-helper.service';
import { CreateAssignment, LoadQuizzes, LoadUsers } from '../../../store/actions/data.actions';
import { DataSelectors } from '../../../store/selectors/data.selectors';
import { GlobalState } from '../../../store/states';

const ALL = 'ALL';

@Component({
  selector: 'ac-create-assignment-page',
  templateUrl: './create-assignment-page.component.html',
  styleUrls: [ './create-assignment-page.component.scss' ]
})
export class CreateAssignmentPageComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public quizzes: List<Quiz> = List();
  public selectedStudents: List<User> = List();
  private isSubmitted = false;
  private groups$: Observable<List<string>>;
  private quizzesSubscription: Subscription;
  private selectedStudentSubscription: Subscription;
  private selectedStudentFormSubscription: Subscription;

  constructor(public dataSelectors: DataSelectors,
              public store: Store<GlobalState>,
              public formBuilder: FormBuilder,
              public fh: FormHelperService) {
  }

  ngOnInit() {
    this.loadUsers();
    this.loadQuizzes();
    this.buildForm();
    this.quizzesSubscription = this.dataSelectors.quizzes$.subscribe(quizzes => this.quizzes = quizzes);
    this.groups$ = this.dataSelectors.students$
      .map((users: List<User>) => users
        .map(user => user.group)
        .toSet()
        .toList()
      );

    this.selectedStudentSubscription = this.dataSelectors.students$
      .combineLatest(this.form.get('groupFilter').valueChanges.startWith(ALL))
      .map(([ users, group ]: [ List<User>, string ]) => users
        .filter(user => group === ALL || user.group === group)
        .toList()
      )
      .subscribe((users: List<User>) => this.selectedStudents = users);
  }

  ngOnDestroy(): void {
    this.quizzesSubscription.unsubscribe();
    this.selectedStudentSubscription.unsubscribe();
    this.selectedStudentFormSubscription.unsubscribe();
  }

  private loadUsers(): void {
    this.dataSelectors.users$
      .first()
      .filter(users => users.count() === 0)
      .subscribe(() => this.store.dispatch(new LoadUsers()));
  }

  private loadQuizzes(): void {
    this.dataSelectors.quizzes$
      .first()
      .filter(quizzes$ => quizzes$.count() === 0)
      .subscribe(() => this.store.dispatch(new LoadQuizzes()));
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      quizId: [ '', Validators.required ],
      groupFilter: [ ALL ],
      selectedUsers: [ '', Validators.required ]
    });

    this.selectedStudentFormSubscription = this.form.get('groupFilter')
      .valueChanges
      .subscribe(() => this.form.get('selectedUsers').setValue(''));
  }

  public selectAll(): void {
    const total = this.selectedStudents.count();
    const totalSelected = this.form.get('selectedUsers').value.length;

    if (totalSelected !== total) {
      this.form
        .get('selectedUsers')
        .setValue(this.selectedStudents.map(user => user.id).toJS());
    }
  }

  public clearAll(): void {
    const totalSelected = this.form.get('selectedUsers').value.length;

    if (totalSelected) {
      this.form
        .get('selectedUsers')
        .setValue([]);
    }
  }

  public submit(): void {
    this.isSubmitted = true;
    const formValue = this.form.value;

    if (this.form.invalid) {
      this.fh.markEachControlAsDirty(this.form);
      return;
    }

    this.store.dispatch(new CreateAssignment({
      quizId: formValue.quizId,
      userIds: List(formValue.selectedUsers)
    }));
  }

}
