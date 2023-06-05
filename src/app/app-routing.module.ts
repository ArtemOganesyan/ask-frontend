import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './components/pages/login-page/login-page.component';
import {RegistrationPageComponent} from './components/pages/registration-page/registration-page.component';
import {HomePageComponent} from './components/pages/home-page/home-page.component';
import {AuthGuardService} from './services/auth-guard.service';
import {NotFoundPageComponent} from './components/pages/not-found-page/not-found-page.component';
import {RegistrationConfirmationPageComponent} from './components/pages/registration-confirmation-page/registration-confirmation-page.component';
import {ActivationCompletePageComponent} from './components/pages/activation-complete-page/activation-complete-page.component';
import {ForgotPasswordPageComponent} from './components/pages/forgot-password-page/forgot-password-page.component';
import {ForgotPasswordConfirmationPageComponent} from './components/pages/forgot-password-confirmation-page/forgot-password-confirmation-page.component';
import {ResetPasswordConfirmationPageComponent} from './components/pages/reset-password-confirmation-page/reset-password-confirmation-page.component';
import {ResetPasswordCompletePageComponent} from './components/pages/reset-password-complete-page/reset-password-complete-page.component';
import {QuizBuilderPageComponent} from './components/pages/quiz-builder-page/quiz-builder-page.component';
import {QuizzesListComponent} from './components/pages/quizzes-list/quizzes-list.component';
import {PendingChangesGuard} from './guards/pending-changes.guard';
import {UserManagementPageComponent} from './components/pages/user-management-page/user-management-page.component';
import {UserDetailsPageComponent} from './components/pages/user-details-page/user-details-page.component';
import {CreateAssignmentPageComponent} from './components/pages/create-assignment-page/create-assignment-page.component';
import {AssignmentsListPageComponent} from './components/pages/assignments-list-page/assignments-list-page.component';
import {StudentAssignmentsPageComponent} from './components/pages/student-assignments-page/student-assignments-page.component';
import {StudentTakeQuizComponent} from './components/pages/student-take-quiz/student-take-quiz.component';
import {GradeQuizPageComponent} from './components/pages/grade-quiz-page/grade-quiz-page.component';
import {SubmissionsListPageComponent} from './components/pages/submissions-list-page/submissions-list-page.component';
import {SettingsPageComponent} from './components/pages/settings-page/settings-page.component';
import {StudentGradesPageComponent} from './components/pages/student-grades-page/student-grades-page.component';
import {GradeDetailsPageComponent} from './components/pages/grade-details-page/grade-details-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: {
      state: 'login'
    }
  },
  {
    path: 'registration',
    component: RegistrationPageComponent,
    data: {
      state: 'registration'
    }
  },
  {
    path: 'registration-confirmation',
    component: RegistrationConfirmationPageComponent,
    data: {
      state: 'registration-confirmation'
    }
  },
  {
    path: 'activate/:userId/:activationCode',
    component: ActivationCompletePageComponent,
    data: {
      state: 'activate'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
    data: {
      state: 'forgot-password'
    }
  },
  {
    path: 'forgot-password-confirmation',
    component: ForgotPasswordConfirmationPageComponent,
    data: {
      state: 'forgot-password-confirmation'
    }
  },
  {
    path: 'reset-password/:userId/:activationCode',
    component: ResetPasswordCompletePageComponent,
    data: {
      state: 'reset-password'
    }
  },
  {
    path: 'reset-password-confirmation',
    component: ResetPasswordConfirmationPageComponent,
    data: {
      state: 'reset-password-confirmation'
    }
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'home'
    }
  },
  {
    path: 'quiz-builder',
    component: QuizBuilderPageComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [PendingChangesGuard],
    data: {
      state: 'quiz-builder'
    }
  },
  {
    path: 'quiz-builder/:id',
    component: QuizBuilderPageComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [PendingChangesGuard],
    data: {
      state: 'quiz-builder'
    }
  },
  {
    path: 'quizzes',
    component: QuizzesListComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'quizzes'
    }
  },
  {
    path: 'users-management',
    component: UserManagementPageComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'users-management'
    }
  },
  {
    path: 'user-details/:id',
    component: UserDetailsPageComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'user-details'
    }
  },
  {
    path: 'assign-quiz',
    component: CreateAssignmentPageComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'assign-quiz'
    }
  },
  {
    path: 'assignments',
    component: AssignmentsListPageComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'assignments'
    }
  },
  {
    path: 'my-assignments',
    component: StudentAssignmentsPageComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'my-assignments'
    }
  },
  {
    path: 'my-grades',
    component: StudentGradesPageComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'my-grades'
    }
  },
  {
    path: 'my-grade-details/:id',
    component: GradeDetailsPageComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'my-grade-details'
    }
  },
  {
    path: 'assessment/:id',
    component: StudentTakeQuizComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'assessment'
    }
  },
  {
    path: 'grade/:id',
    component: GradeQuizPageComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'assessment'
    }
  },
  {
    path: 'submissions/:index',
    component: SubmissionsListPageComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'submissions'
    }
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [AuthGuardService],
    data: {
      state: 'settings'
    }
  },
  {path: '**', component: NotFoundPageComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
