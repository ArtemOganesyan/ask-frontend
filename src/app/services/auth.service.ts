import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from './environment.service';
import {Store} from '@ngrx/store';
import {GlobalState} from '../store/states';
import {LocalStorageService} from './local-storage.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  private API = this.environmentService.getAPIUrl();

  constructor(private http: HttpClient,
              private environmentService: EnvironmentService,
              private store: Store<GlobalState>,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  singIn(email: string, password: string): Observable<{ user: Partial<User>, token: string }> {
    return this.http.post<{ user: Partial<User>, token: string }>(this.API + '/sign-in', {email, password});
  }

  singUp(name: string, email: string, password: string, group:string): Observable<any> {
    return this.http.post<any>(this.API + '/sign-up', {email, password, name, group});
  }

  activateUser(userId: string, activationCode: string): Observable<any> {
    return this.http.get<any>(`${this.API}/activate/${userId}/${activationCode}`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.API}/forgot-password`, {email});
  }

  resetPassword(userId: string, activationCode: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API}/reset-password/${userId}/${activationCode}/`, {password});
  }

  isTokenNotExpired(): boolean {
    const jwtHelperService = new JwtHelperService();
    return !jwtHelperService.isTokenExpired(this.localStorageService.getToken());
  }

}
