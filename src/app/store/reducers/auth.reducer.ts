import {AuthState, initAuthState} from '../states/auth.states';
import {
  ActivateAccountFailure,
  AuthActions,
  AuthActionTypes,
  ChangeMyNameSuccess,
  InitApplication,
  StoreRedirectUrl
} from '../actions/auth.actions';

export function authReducer(state = initAuthState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.SIGNIN: {
      return {...state, isAuthorizationFetching: true};
    }

    case AuthActionTypes.SIGNIN_SUCCESS: {
      return {...state, isAuthorizationFetching: false, isAuthorized: true};
    }

    case AuthActionTypes.SIGNIN_FAILURE: {
      return {...state, isAuthorizationFetching: false};
    }

    case AuthActionTypes.REGISTRATION: {
      return {...state, isRegistrationFetching: true};
    }

    case AuthActionTypes.REGISTRATION_SUCCESS: {
      return {...state, isRegistrationFetching: false};
    }

    case AuthActionTypes.REGISTRATION_FAILURE: {
      return {...state, isRegistrationFetching: false};
    }

    case AuthActionTypes.INIT_APPLICATION: {
      return {...state, isAuthorized: true, activeUser: (action as InitApplication).payload.user};
    }

    case AuthActionTypes.STORE_REDIRECT_URL: {
      return {...state, redirectUrl: (action as StoreRedirectUrl).payload.redirectUrl};
    }

    case AuthActionTypes.SIGN_OUT: {
      return {...initAuthState};
    }

    case AuthActionTypes.ACTIVATE_ACCOUNT: {
      return {...state, isActivationFetching: true};
    }

    case AuthActionTypes.ACTIVATE_ACCOUNT_SUCCESS: {
      return {...state, isActivationFetching: false, isActivated: true};
    }

    case AuthActionTypes.ACTIVATE_ACCOUNT_FAILURE: {
      return {
        ...state,
        isActivationFetching: false,
        activationErrorMessage: (action as ActivateAccountFailure).payload.activationErrorMessage
      };
    }

    case AuthActionTypes.RESET_PASSWORD: {
      return {...state, isPasswordResetting: true};
    }

    case AuthActionTypes.RESET_PASSWORD_SUCCESS: {
      return {...state, isPasswordResetting: false};
    }

    case AuthActionTypes.RESET_PASSWORD_FAILURE: {
      return {...state, isPasswordResetting: false};
    }

    case AuthActionTypes.FORGOT_PASSWORD: {
      return {...state, isPasswordForgotRequestFetching: true};
    }

    case AuthActionTypes.FORGOT_PASSWORD_SUCCESS: {
      return {...state, isPasswordForgotRequestFetching: false};
    }

    case AuthActionTypes.FORGOT_PASSWORD_FAILURE: {
      return {...state, isPasswordForgotRequestFetching: false};
    }

    case AuthActionTypes.CHANGE_MY_NAME: {
      return {...state, isChangingActiveUser: true};
    }

    case AuthActionTypes.CHANGE_MY_NAME_SUCCESS: {
      return {
        ...state,
        isChangingActiveUser: false,
        activeUser: {...state.activeUser, name: (action as ChangeMyNameSuccess).payload.newName}
      };
    }

    case AuthActionTypes.CHANGE_MY_NAME_FAILURE: {
      return {...state, isChangingActiveUser: false};
    }

    case AuthActionTypes.CHANGE_MY_PASSWORD: {
      return {...state, isChangingActiveUser: true};
    }

    case AuthActionTypes.CHANGE_MY_PASSWORD_SUCCESS: {
      return {...state, isChangingActiveUser: false};
    }

    case AuthActionTypes.CHANGE_MY_PASSWORD_FAILURE: {
      return {...state, isChangingActiveUser: false};
    }

    default: {
      return state;
    }
  }
}
