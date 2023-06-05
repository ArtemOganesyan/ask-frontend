import {User} from '../../models/user';

export interface AuthState {
  isAuthorized: boolean;
  isAuthorizationFetching: boolean;
  redirectUrl: string;

  isRegistrationFetching: boolean;

  isActivationFetching: boolean;
  isActivated: boolean;
  activationErrorMessage: string;

  activeUser: Partial<User>;

  isPasswordForgotRequestFetching: boolean;
  isPasswordResetting: boolean;

  isChangingActiveUser: boolean;
}

export const initAuthState: AuthState = {
  isAuthorized: false,
  isAuthorizationFetching: false,
  redirectUrl: null,

  isRegistrationFetching: false,

  isActivationFetching: false,
  isActivated: false,
  activationErrorMessage: null,

  activeUser: null,

  isPasswordForgotRequestFetching: false,
  isPasswordResetting: false,

  isChangingActiveUser: false
};
