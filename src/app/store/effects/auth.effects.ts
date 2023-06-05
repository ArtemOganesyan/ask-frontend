import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {
  ActivateAccount,
  ActivateAccountFailure,
  ActivateAccountSuccess,
  AuthActions,
  AuthActionTypes, ChangeMyName, ChangeMyNameFailure, ChangeMyNameSuccess, ChangeMyPassword, ChangeMyPasswordFailure,
  ChangeMyPasswordSuccess,
  CheckAuthorizationFailure, ForgotPassword, ForgotPasswordFailure, ForgotPasswordSuccess,
  InitApplication,
  NavigateAfterSignIn,
  Registration,
  RegistrationFailure,
  RegistrationSuccess, ResetPassword, ResetPasswordFailure, ResetPasswordSuccess,
  SignIn,
  SignInFailure,
  SignInSuccess
} from '../actions/auth.actions';
import {AuthService} from '../../services/auth.service';
import {catchError, map} from 'rxjs/operators';
import {User} from '../../models/user';
import {of} from 'rxjs/observable/of';
import {NotificationActions, ShowNotificationError} from '../actions/notification.actions';
import {HttpHelper} from '../../helpers/HttpHelper';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';
import {GlobalState} from '../states';
import {Store} from '@ngrx/store';
import {SettingsHttpService} from '../../services/settings-http.service';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private authHttpService: AuthService,
              private settingsHttpService: SettingsHttpService,
              private localStorageService: LocalStorageService,
              private router: Router,
              private store: Store<GlobalState>) {
  }

  @Effect()
  signIn$ = this.actions$
    .ofType(AuthActionTypes.SIGNIN)
    .switchMap((action: SignIn) => HttpHelper.slowDown(this.authHttpService
      .singIn(action.payload.email, action.payload.password))
      .pipe(
        map((body: { user: Partial<User>, token: string }) => new SignInSuccess(body)),
        catchError(error => of<AuthActions | NotificationActions>(
          new SignInFailure(),
          new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
        ))
      )
    );

  @Effect()
  signInSuccess$ = this.actions$
    .ofType(AuthActionTypes.SIGNIN_SUCCESS)
    .do((action: SignInSuccess) => {
      this.localStorageService.setToken(action.payload.token);
      this.localStorageService.setUser(action.payload.user);
    })
    .flatMap((action: SignInSuccess) => [
      new InitApplication({user: action.payload.user}),
      new NavigateAfterSignIn()
    ]);

  @Effect()
  signUp$ = this.actions$
    .ofType(AuthActionTypes.REGISTRATION)
    .map(action => (action as Registration).payload.user)
    .switchMap((user: Partial<User>) => HttpHelper
      .slowDown(this.authHttpService.singUp(user.name, user.email, user.password, user.group))
      .do(() => this.router.navigate(['/registration-confirmation']))
      .map(() => new RegistrationSuccess())
      .catch(error => of<AuthActions | NotificationActions>(
        new RegistrationFailure(),
        new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
      ))
    );

  @Effect()
  activateAccount$ = this.actions$
    .ofType(AuthActionTypes.ACTIVATE_ACCOUNT)
    .map(action => (action as ActivateAccount).payload)
    .switchMap((payload: { userId: string; activationCode: string }) => HttpHelper
      .slowDown(this.authHttpService.activateUser(payload.userId, payload.activationCode))
      .map(() => new ActivateAccountSuccess())
      .catch(error => of(new ActivateAccountFailure({activationErrorMessage: HttpHelper.getErrorMessage(error)})))
    );

  @Effect()
  forgotPassword$ = this.actions$
    .ofType(AuthActionTypes.FORGOT_PASSWORD)
    .map(action => (action as ForgotPassword).payload.email)
    .switchMap((email: string) => HttpHelper
      .slowDown(this.authHttpService.forgotPassword(email))
      .do(() => this.router.navigate(['/forgot-password-confirmation']))
      .map(() => new ForgotPasswordSuccess())
      .catch(error => of<AuthActions | NotificationActions>(
        new ForgotPasswordFailure(),
        new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
      ))
    );

  @Effect()
  resetPassword$ = this.actions$
    .ofType(AuthActionTypes.RESET_PASSWORD)
    .map(action => (action as ResetPassword).payload)
    .switchMap((payload:{userId: string; activationCode: string; password: string}) => HttpHelper
      .slowDown(this.authHttpService.resetPassword(payload.userId, payload.activationCode, payload.password))
      .do(() => this.router.navigate(['/reset-password-confirmation']))
      .map(() => new ResetPasswordSuccess())
      .catch(error => of<AuthActions | NotificationActions>(
        new ResetPasswordFailure(),
        new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
      ))
    );

  @Effect()
  checkAuthorization$ = this.actions$
    .ofType(AuthActionTypes.CHECK_AUTHORIZATION)
    .map(() => this.authHttpService.isTokenNotExpired()
      ? new InitApplication({user: this.localStorageService.getUser()})
      : new CheckAuthorizationFailure()
    );

  @Effect({dispatch: false})
  navigateAfterSignIn$ = this.actions$
    .ofType(AuthActionTypes.NAVIGATE_AFTER_SIGN_IN)
    .switchMap(() => this.store.select(store => store.authState.redirectUrl).first())
    .do((redirectUrl: string) => this.router.navigate([redirectUrl ? redirectUrl : '/home']));

  @Effect({dispatch: false})
  signOut$ = this.actions$
    .ofType(AuthActionTypes.SIGN_OUT)
    .do(() => {
      this.localStorageService.clear();
      this.router.navigate(['/login']);
    });

  @Effect()
  changeMyName$ = this.actions$
    .ofType(AuthActionTypes.CHANGE_MY_NAME)
    .map(action => (action as ChangeMyName).payload)
    .switchMap((payload:{newName: string}) => HttpHelper
      .slowDown(this.settingsHttpService.changeName(payload.newName))
      .do(() => this.localStorageService.setUser(this.localStorageService.getUser().setName(payload.newName)))
      .map(() => new ChangeMyNameSuccess({newName: payload.newName}))
      .catch(error => of<AuthActions | NotificationActions>(
        new ChangeMyNameFailure(),
        new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
      ))
    );

  @Effect()
  changeMyPassword$ = this.actions$
    .ofType(AuthActionTypes.CHANGE_MY_PASSWORD)
    .map(action => (action as ChangeMyPassword).payload)
    .switchMap((payload:{password: string, newPassword: string}) => HttpHelper
      .slowDown(this.settingsHttpService.changePassword(payload.password, payload.newPassword))
      .map(() => new ChangeMyPasswordSuccess())
      .catch(error => of<AuthActions | NotificationActions>(
        new ChangeMyPasswordFailure(),
        new ShowNotificationError({message: HttpHelper.getErrorMessage(error)})
      ))
    );
}
