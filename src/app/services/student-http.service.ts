import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from './environment.service';
import {List} from 'immutable';
import {Assignment} from '../models/assignment';
import {Observable} from 'rxjs/Observable';
import {AssignmentResult} from '../models/assignment.result';
import {AssignmentToPass} from '../models/assignment.to.pass';

@Injectable()
export class StudentHttpService {

  private API = this.environmentService.getAPIUrl();

  constructor(private http: HttpClient,
              private environmentService: EnvironmentService) {
  }

  loadStudentAssignments(): Observable<List<AssignmentToPass>> {
    return this.http
      .get<any[]>(this.API + '/my-assignments')
      .map((arrayObj: any[]) => List<AssignmentToPass>(arrayObj.map(obj => AssignmentToPass.deserialize(obj))));
  }

  loadStudentGrades(): Observable<List<Assignment>> {
    return this.http
      .get<any[]>(this.API + '/my-grades')
      .map((arrayObj: any[]) => List<Assignment>(arrayObj.map(obj => Assignment.deserialize(obj))));
  }

  submitAssignment(assignmentResult: AssignmentResult): Observable<List<Assignment>> {
    return this.http
      .post<any[]>(this.API + '/submit-assignment', assignmentResult.serialize())
      .map((arrayObj: any[]) => List<Assignment>(arrayObj.map(obj => Assignment.deserialize(obj))));
  }

  savePasteDetection(assignmentId: number, questionNumber: number, value: string) {
    return this.http
      .post<any>(`${this.API}/paste-detection/${assignmentId}/${questionNumber}`, {value});
  }
}
