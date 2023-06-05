import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {GlobalState} from '../store/states';
import {AuthService} from './auth.service';
import {SignOut, StoreRedirectUrl} from '../store/actions/auth.actions';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<GlobalState>,
              private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isTokenNotExpired()
      ? true
      : (() => {
        this.store.dispatch(new StoreRedirectUrl({redirectUrl: state.url }));
        this.store.dispatch(new SignOut());
        return false;
      })();
  }


}
