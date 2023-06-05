import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from './environment.service';
import {Observable} from 'rxjs/Observable';
import {Quiz} from '../models/quiz';
import {List} from 'immutable';

@Injectable()
export class QuizHttpService {

  private API = this.environmentService.getAPIUrl();

  constructor(private http: HttpClient,
              private environmentService: EnvironmentService) {
  }

  loadQuizzes(): Observable<List<Quiz>> {
    return this.http
      .get<any[]>(this.API + '/quizzes')
      .map((arrayObj: any[]) => List<Quiz>(arrayObj.map(obj => Quiz.deserialize(obj))));
  }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http
      .post<{id: number; createdAt: string; updatedAt: string}>(this.API + '/quiz', quiz.serialize())
      .map((obj) => quiz
        .setId(obj.id)
        .setCreateAtFromString(obj.createdAt)
        .setUpdateAtFromString(obj.updatedAt)
      )
  }

  updateQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http
      .put<{id: number; createdAt: string; updatedAt: string}>(this.API + '/quiz', quiz.serialize())
      .map((obj) => quiz
        .setId(obj.id)
        .setCreateAtFromString(obj.createdAt)
        .setUpdateAtFromString(obj.updatedAt)
      )
  }

  deleteQuiz(quizId: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/quiz/${quizId}`);
  }

}
