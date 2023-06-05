import {Action} from '@ngrx/store';
import {User} from '../../models/user';

export enum AuthActionTypes {

  SIGNIN = 'SIGNIN',
  SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
  SIGNIN_FAILURE = 'SIGNIN_FAILURE',

  NAVIGATE_AFTER_SIGN_IN = 'NAVIGATE_AFTER_SIGN_IN',

  REGISTRATION = 'REGISTRATION',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  REGISTRATION_FAILURE = 'REGISTRATION_FAILURE',

  CHECK_AUTHORIZATION = 'CHECK_AUTHORIZATION',
  CHECK_AUTHORIZATION_FAILURE = 'CHECK_AUTHORIZATION_FAILURE',
  INIT_APPLICATION = 'INIT_APPLICATION',

  STORE_REDIRECT_URL = 'STORE_REDIRECT_URL',

  SIGN_OUT = 'SIGN_OUT',

  ACTIVATE_ACCOUNT = 'ACTIVATE_ACCOUNT',
  ACTIVATE_ACCOUNT_SUCCESS = 'ACTIVATE_ACCOUNT_SUCCESS',
  ACTIVATE_ACCOUNT_FAILURE = 'ACTIVATE_ACCOUNT_FAILURE',

  RESET_PASSWORD = 'RESET_PASSWORD',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE',

  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE',

  CHANGE_MY_NAME = 'CHANGE_MY_NAME',
  CHANGE_MY_NAME_SUCCESS = 'CHANGE_MY_NAME_SUCCESS',
  CHANGE_MY_NAME_FAILURE = 'CHANGE_MY_NAME_FAILURE',

  CHANGE_MY_PASSWORD = 'CHANGE_MY_PASSWORD',
  CHANGE_MY_PASSWORD_SUCCESS = 'CHANGE_MY_PASSWORD_SUCCESS',
  CHANGE_MY_PASSWORD_FAILURE = 'CHANGE_MY_PASSWORD_FAILURE'
}

export class SignIn implements Action {
  readonly type = AuthActionTypes.SIGNIN;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class SignInSuccess implements Action {
  readonly type = AuthActionTypes.SIGNIN_SUCCESS;

  constructor(public payload: { user: Partial<User>, token: string }) {
  }
}

export class SignInFailure implements Action {
  readonly type = AuthActionTypes.SIGNIN_FAILURE;
}

export class NavigateAfterSignIn implements Action {
  readonly type = AuthActionTypes.NAVIGATE_AFTER_SIGN_IN;
}


export class Registration implements Action {
  readonly type = AuthActionTypes.REGISTRATION;

  constructor(public payload: { user: Partial<User> }) {
  }
}

export class RegistrationSuccess implements Action {
  readonly type = AuthActionTypes.REGISTRATION_SUCCESS;

}

export class RegistrationFailure implements Action {
  readonly type = AuthActionTypes.REGISTRATION_FAILURE;
}

export class CheckAuthorization implements Action {
  type = AuthActionTypes.CHECK_AUTHORIZATION;
}

export class CheckAuthorizationFailure implements Action {
  type = AuthActionTypes.CHECK_AUTHORIZATION_FAILURE;
}

export class InitApplication implements Action {
  type = AuthActionTypes.INIT_APPLICATION;

  constructor(public payload: { user: Partial<User> }) {
  }
}

export class StoreRedirectUrl implements Action {
  type = AuthActionTypes.STORE_REDIRECT_URL;

  constructor(public payload: { redirectUrl: string }) {
  }
}

export class SignOut implements Action {
  type = AuthActionTypes.SIGN_OUT;
}

export class ActivateAccount implements Action {
  readonly type = AuthActionTypes.ACTIVATE_ACCOUNT;

  constructor(public payload: { userId: string; activationCode: string }) {
  }
}

export class ActivateAccountSuccess implements Action {
  readonly type = AuthActionTypes.ACTIVATE_ACCOUNT_SUCCESS;

}

export class ActivateAccountFailure implements Action {
  readonly type = AuthActionTypes.ACTIVATE_ACCOUNT_FAILURE;

  constructor(public payload: { activationErrorMessage: string }) {
  }
}

export class ResetPassword implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD;

  constructor(public payload: { userId: string; activationCode: string; password: string }) {
  }
}

export class ResetPasswordSuccess implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_SUCCESS;

}

export class ResetPasswordFailure implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_FAILURE;
}

export class ForgotPassword implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD;

  constructor(public payload: { email: string }) {
  }
}

export class ForgotPasswordSuccess implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD_SUCCESS;

}

export class ForgotPasswordFailure implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD_FAILURE;
}

export class ChangeMyName implements Action {
  readonly type = AuthActionTypes.CHANGE_MY_NAME;

  constructor(public payload: { newName: string }) {
  }
}

export class ChangeMyNameSuccess implements Action {
  readonly type = AuthActionTypes.CHANGE_MY_NAME_SUCCESS;

  constructor(public payload: { newName: string }) {
  }
}

export class ChangeMyNameFailure implements Action {
  readonly type = AuthActionTypes.CHANGE_MY_NAME_FAILURE;
}

export class ChangeMyPassword implements Action {
  readonly type = AuthActionTypes.CHANGE_MY_PASSWORD;

  constructor(public payload: { password: string, newPassword: string }) {
  }
}

export class ChangeMyPasswordSuccess implements Action {
  readonly type = AuthActionTypes.CHANGE_MY_PASSWORD_SUCCESS;

}

export class ChangeMyPasswordFailure implements Action {
  readonly type = AuthActionTypes.CHANGE_MY_PASSWORD_FAILURE;
}

export type AuthActions =
  SignIn
  | SignInSuccess
  | SignInFailure
  | NavigateAfterSignIn
  | Registration
  | RegistrationSuccess
  | RegistrationFailure
  | CheckAuthorization
  | CheckAuthorizationFailure
  | InitApplication
  | StoreRedirectUrl
  | SignOut
  | ActivateAccount
  | ActivateAccountSuccess
  | ActivateAccountFailure
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordFailure
  | ForgotPassword
  | ForgotPasswordSuccess
  | ForgotPasswordFailure
  | ChangeMyName
  | ChangeMyNameSuccess
  | ChangeMyNameFailure
  | ChangeMyPassword
  | ChangeMyPasswordSuccess
  | ChangeMyPasswordFailure;
