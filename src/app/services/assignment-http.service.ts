import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from './environment.service';
import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import {Assignment} from '../models/assignment';
import {IGradeForm} from '../interfaces/IGradeForm';

@Injectable()
export class AssignmentHttpService {

  private API = this.environmentService.getAPIUrl();

  constructor(private http: HttpClient,
              private environmentService: EnvironmentService) {
  }

  loadAssignments(): Observable<List<Assignment>> {
    return this.http
      .get<any[]>(this.API + '/assignments')
      .map((arrayObj: any[]) => List<Assignment>(arrayObj.map(obj => Assignment.deserialize(obj))));
  }

  createAssignment(quizId: number, userIds: List<number>): Observable<List<Assignment>> {
    return this.http
      .post<any[]>(this.API + '/assignment', {quizId, userIds: userIds.toJS()})
      .map((objs) => List(objs.map(obj => Assignment.deserialize(obj))));
  }

  deleteAssignment(assignmentGroupID: string): Observable<void> {
    return this.http
      .delete<void>(this.API + '/assignment/' + assignmentGroupID);
  }

  gradeAssignment(assignmentId: number, grade: IGradeForm): Observable<List<Assignment>> {
    return this.http
      .put<any[]>(this.API + `/assignment/` + assignmentId, {
        summary: grade.summary,
        result: grade.result,
        grades: grade.grades.toJS()
      })
      .map(objs => List(objs.map(obj => Assignment.deserialize(obj))));
  }

}
