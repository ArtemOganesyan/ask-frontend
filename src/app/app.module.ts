import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import {LoginPageComponent} from './components/pages/login-page/login-page.component';
import {AppRoutingModule} from './app-routing.module';
import {RegistrationPageComponent} from './components/pages/registration-page/registration-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormHelperService} from './services/form-helper.service';
import {StoreModule} from '@ngrx/store';
import {rootReducer} from './store/reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {rootEffects} from './store/effects';
import {EffectsModule} from '@ngrx/effects';
import {AuthService} from './services/auth.service';
import {EnvironmentService} from './services/environment.service';
import {LocalStorageService} from './services/local-storage.service';
import {HomePageComponent} from './components/pages/home-page/home-page.component';
import {NotFoundPageComponent} from './components/pages/not-found-page/not-found-page.component';
import {AuthGuardService} from './services/auth-guard.service';
import {SpinnerComponent} from './components/elements/spinner/spinner.component';
import {AuthSelectors} from './store/selectors/auth.selectors';
import {SideMenuComponent} from './components/elements/side-menu/side-menu.component';
import {ModalConfirmationComponent} from './components/modals/modal-confirmation/modal-confirmation.component';
import {RegistrationConfirmationPageComponent} from './components/pages/registration-confirmation-page/registration-confirmation-page.component';
import {ForgotPasswordPageComponent} from './components/pages/forgot-password-page/forgot-password-page.component';
import {ActivationCompletePageComponent} from './components/pages/activation-complete-page/activation-complete-page.component';
import {ResetPasswordCompletePageComponent} from './components/pages/reset-password-complete-page/reset-password-complete-page.component';
import {ForgotPasswordConfirmationPageComponent} from './components/pages/forgot-password-confirmation-page/forgot-password-confirmation-page.component';
import {ResetPasswordConfirmationPageComponent} from './components/pages/reset-password-confirmation-page/reset-password-confirmation-page.component';
import {QuizBuilderPageComponent} from './components/pages/quiz-builder-page/quiz-builder-page.component';
import {QuizPassingPercentageComponent} from './components/forms/quiz-passing-percentage/quiz-passing-percentage.component';
import {QuizBuilderService} from './services/quiz-builder.service';
import {QuestionBodyFormComponent} from './components/forms/question-body-form/question-body-form.component';
import {QuizzesListComponent} from './components/pages/quizzes-list/quizzes-list.component';
import {QuizHttpService} from './services/quiz-http.service';
import {DataSelectors} from './store/selectors/data.selectors';
import {PendingChangesGuard} from './guards/pending-changes.guard';
import {TakeQuizComponent} from './components/elements/take-quiz/take-quiz.component';
import {QuizPreviewComponent} from './components/modals/quiz-preview/quiz-preview.component';
import {QuizTextualQuestionComponent} from './components/forms/quiz-textual-question/quiz-textual-question.component';
import {QuizSingleChoiceQuestionComponent} from './components/forms/quiz-single-choice-question/quiz-single-choice-question.component';
import {QuizMultipleChoiceQuestionComponent} from './components/forms/quiz-multiple-choice-question/quiz-multiple-choice-question.component';
import {TakeQuizService} from './services/take-quiz.service';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import {UserManagementPageComponent} from './components/pages/user-management-page/user-management-page.component';
import {UsersListComponent} from './components/elements/users-list/users-list.component';
import {UserHttpService} from './services/user-http.service';
import {UserDetailsPageComponent} from './components/pages/user-details-page/user-details-page.component';
import {ModalNotificationComponent} from './components/modals/modal-notification/modal-notification.component';
import {ModalAdjustUserComponent} from './components/modals/modal-change-name/modal-change-name.component';
import {CreateAssignmentPageComponent} from './components/pages/create-assignment-page/create-assignment-page.component';
import {AssignmentHttpService} from './services/assignment-http.service';
import {AssignmentsListPageComponent} from './components/pages/assignments-list-page/assignments-list-page.component';
import {StudentAssignmentsPageComponent} from './components/pages/student-assignments-page/student-assignments-page.component';
import {StudentHttpService} from './services/student-http.service';
import {StudentSelectors} from './store/selectors/student.selectors';
import {StudentTakeQuizComponent} from './components/pages/student-take-quiz/student-take-quiz.component';
import {GradeQuizPageComponent} from './components/pages/grade-quiz-page/grade-quiz-page.component';
import {GradeFormComponent} from './components/forms/grade-form/grade-form.component';
import {SubmissionsListPageComponent} from './components/pages/submissions-list-page/submissions-list-page.component';
import {HomeStudentComponent} from './components/elements/home-student/home-student.component';
import {HomeTeacherComponent} from './components/elements/home-teacher/home-teacher.component';
import {SettingsPageComponent} from './components/pages/settings-page/settings-page.component';
import {ModalChangePasswordComponent} from './components/modals/modal-change-password/modal-change-password.component';
import {SettingsHttpService} from './services/settings-http.service';
import {StudentGradesPageComponent} from './components/pages/student-grades-page/student-grades-page.component';
import {GradeDetailsPageComponent} from './components/pages/grade-details-page/grade-details-page.component';
import {PasteDetectionDirective} from './directives/paste-detection.directive';
import { PasteDetectionComponent } from './components/modals/paste-detection/paste-detection.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    HomePageComponent,
    NotFoundPageComponent,
    SpinnerComponent,
    SideMenuComponent,
    ModalConfirmationComponent,
    RegistrationConfirmationPageComponent,
    ForgotPasswordPageComponent,
    ActivationCompletePageComponent,
    ResetPasswordCompletePageComponent,
    ForgotPasswordConfirmationPageComponent,
    ResetPasswordConfirmationPageComponent,
    QuizBuilderPageComponent,
    QuizPassingPercentageComponent,
    QuestionBodyFormComponent,
    QuizzesListComponent,
    TakeQuizComponent,
    QuizPreviewComponent,
    QuizTextualQuestionComponent,
    QuizSingleChoiceQuestionComponent,
    QuizMultipleChoiceQuestionComponent,
    UserManagementPageComponent,
    UsersListComponent,
    UserDetailsPageComponent,
    ModalNotificationComponent,
    ModalAdjustUserComponent,
    CreateAssignmentPageComponent,
    AssignmentsListPageComponent,
    StudentAssignmentsPageComponent,
    StudentTakeQuizComponent,
    GradeQuizPageComponent,
    GradeFormComponent,
    SubmissionsListPageComponent,
    HomeStudentComponent,
    HomeTeacherComponent,
    SettingsPageComponent,
    ModalChangePasswordComponent,
    StudentGradesPageComponent,
    GradeDetailsPageComponent,
    PasteDetectionDirective,
    PasteDetectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, MatCheckboxModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatDividerModule,
    MatSidenavModule, MatProgressSpinnerModule, MatProgressBarModule,
    MatSnackBarModule, MatIconModule, MatListModule, MatSliderModule,
    MatSelectModule, MatDialogModule, MatExpansionModule, MatRadioModule,
    MatMenuModule, MatTabsModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer, {}),
    EffectsModule.forRoot(rootEffects),
    environment ? StoreDevtoolsModule.instrument({maxAge: 50}) : []
  ],
  providers: [
    FormHelperService, AuthService, EnvironmentService, LocalStorageService,
    AuthGuardService, AuthSelectors, QuizBuilderService, SettingsHttpService,
    QuizHttpService, DataSelectors, PendingChangesGuard, TakeQuizService, UserHttpService,
    AssignmentHttpService, StudentHttpService, StudentSelectors,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  entryComponents: [
    ModalConfirmationComponent, QuizPreviewComponent, ModalNotificationComponent,
    ModalAdjustUserComponent, ModalChangePasswordComponent, PasteDetectionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
