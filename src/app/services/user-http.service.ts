import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from './environment.service';
import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {UserRole} from '../enums/UserRole';

@Injectable()
export class UserHttpService {

  private API = this.environmentService.getAPIUrl();

  constructor(private http: HttpClient,
              private environmentService: EnvironmentService) {
  }

  loadUsers(): Observable<List<User>> {
    return this.http
      .get<any[]>(this.API + '/users')
      .map((arrayObj: any[]) => List<User>(arrayObj.map(obj => User.deserialize(obj))));
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/users/${userId}`);
  }


  changeUserName(user: User, name: string): Observable<User> {
    return this.http
      .put<void>(this.API + `/users/change-name/${user.id}`, {name})
      .map(() => user.setName(name));
  }

  changeUserGroup(user: User, group: string) {
    return this.http
      .put<void>(this.API + `/users/change-group/${user.id}`, {group})
      .map(() => user.setGroup(group));
  }

  changeUserRole(user: User, role: UserRole): Observable<User> {
    return this.http
      .put<void>(this.API + `/users/change-role/${user.id}`, {role})
      .map(() => user.setRole(role));
  }

}
