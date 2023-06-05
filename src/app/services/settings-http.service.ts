import {Injectable} from '@angular/core';
import {EnvironmentService} from './environment.service';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SettingsHttpService {

  private API = this.environmentService.getAPIUrl();

  constructor(private http: HttpClient,
              private environmentService: EnvironmentService) {
  }

  changeName(newName: string): Observable<any> {
    return this.http.post<any>(`${this.API}/settings/change-name`, {newName});
  }

  changePassword(password: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.API}/settings/change-password`, {password, newPassword});
  }

}
