import {Injectable} from '@angular/core';
import {GlobalState} from '../states';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {UserRole} from '../../enums/UserRole';
import {User} from '../../models/user';

@Injectable()
export class AuthSelectors {

  constructor(private store: Store<GlobalState>) {
  }

  get isAuthorizing$(): Observable<boolean> {
    return this.store.select(store => store.authState.isAuthorizationFetching);
  }

  get isAuthorized$(): Observable<boolean> {
    return this.store.select(store => store.authState.isAuthorized);
  }

  get isRegistrationFetching$(): Observable<boolean> {
    return this.store.select(store => store.authState.isRegistrationFetching);
  }

  get activeUser$(): Observable<Partial<User>> {
    return this.store.select(state => state.authState.activeUser)
  }

  get activeUserId$(): Observable<number> {
    return this.store
      .select(store => store.authState.activeUser)
      .filter(user => user !== null)
      .map(user => user.id);
  }

  get activeUserName$(): Observable<string> {
    return this.store
      .select(store => store.authState.activeUser)
      .filter(user => user !== null)
      .map(user => user.name);
  }

  get activeUserRole$(): Observable<UserRole> {
    return this.store
      .select(store => store.authState.activeUser)
      .filter(user => user !== null)
      .map(user => user.role);
  }

  get activeUserIsTeacher$(): Observable<boolean> {
    return this.activeUserRole$
      .map(role => role === UserRole.TEACHER);
  }

  get activeUserIsStudent$(): Observable<boolean> {
    return this.activeUserRole$
      .map(role => role === UserRole.STUDENT);
  }

  get isActivationFetching$(): Observable<boolean> {
    return this.store
      .select(state => state.authState.isActivationFetching);
  }

  get isActivated$(): Observable<boolean> {
    return this.store
      .select(state => state.authState.isActivated);
  }

  get getActivationErrorMessage$(): Observable<string> {
    return this.store
      .select(state => state.authState.activationErrorMessage);
  }

  get isPasswordForgotRequestFetching$(): Observable<boolean> {
    return this.store
      .select(state => state.authState.isPasswordForgotRequestFetching);
  }

  get isPasswordResetting$(): Observable<boolean> {
    return this.store
      .select(state => state.authState.isPasswordResetting);
  }

  get isChangingActiveUser$(): Observable<boolean> {
    return this.store
      .select(state => state.authState.isChangingActiveUser);
  }


}
