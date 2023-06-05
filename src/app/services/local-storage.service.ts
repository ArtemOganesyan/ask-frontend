import {Injectable} from '@angular/core';
import {UserRole} from '../enums/UserRole';
import {User} from '../models/user';
import {LocalStorageKeys} from '../enums/LocalStorageKeys';
import {Quiz} from '../models/quiz';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  setToken(token: string): void {
    this.set(LocalStorageKeys.TOKEN, token);
  }

  getToken(): string {
    return this.get(LocalStorageKeys.TOKEN);
  }

  setUser(user: Partial<User>): void {
    this.set(LocalStorageKeys.USER_ID, user.id+'');
    this.set(LocalStorageKeys.USER_NAME, user.name);
    this.set(LocalStorageKeys.USER_ROLE, user.role);
    this.set(LocalStorageKeys.USER_EMAIL, user.email);
    this.set(LocalStorageKeys.USER_AVATAR, user.avatar);
  }

  getUser(): Partial<User> {
    const user = new User();

    user.id = Number(this.get(LocalStorageKeys.USER_ID));
    user.name = this.get(LocalStorageKeys.USER_NAME);
    user.role = UserRole[this.get(LocalStorageKeys.USER_ROLE)];
    user.email = UserRole[this.get(LocalStorageKeys.USER_EMAIL)];
    user.avatar = UserRole[this.get(LocalStorageKeys.USER_AVATAR)];

    return user;
  }


  clear(): void {
    localStorage.clear();
  }

  private get(key: string): string {
    return localStorage.getItem(key);
  }

  private set(key: string, value: string): void {
    return localStorage.setItem(key, value);
  }

  setQuiz(quiz: Quiz) {
    localStorage.setItem(LocalStorageKeys.QUIZ, JSON.stringify(quiz.serialize()));
  }

  getQuiz(): Quiz {
    try {
      return Quiz.deserialize(JSON.parse(localStorage.getItem(LocalStorageKeys.QUIZ)));
    } catch (e) {
      return null;
    }
  }

  clearQuiz() {
    return localStorage.removeItem(LocalStorageKeys.QUIZ);
  }
}
