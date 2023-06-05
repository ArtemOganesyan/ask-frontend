import {Injectable} from '@angular/core';
import {GlobalState} from '../states';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';
import {Quiz} from '../../models/quiz';
import {User} from '../../models/user';
import {UserRole} from '../../enums/UserRole';
import {Assignment} from '../../models/assignment';

@Injectable()
export class DataSelectors {

  constructor(private store: Store<GlobalState>) {
  }

  get isQuizzesLoading$(): Observable<boolean> {
    return this.store.select(store => store.dataState.isQuizzesLoading);
  }

  get isQuizSaving$(): Observable<boolean> {
    return this.store.select(store => store.dataState.isQuizSaving);
  }

  get isQuizDeleting$(): Observable<boolean> {
    return this.store.select(store => store.dataState.isQuizDeleting);
  }

  get quizzes$(): Observable<List<Quiz>> {
    return this.store.select(store => store.dataState.quizzes);
  }

  get isUsersLoading$(): Observable<boolean> {
    return this.store.select(store => store.dataState.isUsersLoading);
  }

  get isUserSaving$(): Observable<boolean> {
    return this.store.select(store => store.dataState.isUserSaving);
  }

  get isUserDeleting$(): Observable<boolean> {
    return this.store.select(store => store.dataState.isUserDeleting);
  }

  get users$(): Observable<List<User>> {
    return this.store.select(store => store.dataState.users);
  }

  get students$(): Observable<List<User>> {
    return this.users$.map(users => users
      .filter(user => user.role === UserRole.STUDENT)
      .toList()
    );
  }

  get studentsSortedByName$(): Observable<List<User>> {
    return this.users$.map(users => users
      .filter(user => (user.role === UserRole.STUDENT) && user.active)
      .toList()
      .sort((a,b) => a.name.localeCompare(b.name))
      .toList()
    );
  }

  get teachers$(): Observable<List<User>> {
    return this.users$.map(users => users
      .filter(user => user.role === UserRole.TEACHER)
      .toList()
    );
  }

  get teachersSortedByName$(): Observable<List<User>> {
    return this.users$.map(users => users
      .filter(user => user.role === UserRole.TEACHER)
      .toList()
      .sort((a,b) => a.name.localeCompare(b.name))
      .toList()
    );
  }

  get assignments$(): Observable<List<Assignment>> {
    return this.store.select(store => store.dataState.assignments);
  }

  get assignmentsToGrade$(): Observable<List<Assignment>> {
    return this.store
      .select(store => store.dataState.assignments)
      .map((assignments: List<Assignment>) => assignments
        .filter(assignment => assignment.isPending() && assignment.isSubmitted())
        .toList()
      );
  }

  get assignmentsAutoGraded$(): Observable<List<Assignment>> {
    return this.store
      .select(store => store.dataState.assignments)
      .map((assignments: List<Assignment>) => assignments
        .filter(assignment => (assignment.isPassed() || assignment.isFailed()) && assignment.isAutoGraded())
        .toList()
      );
  }

  get assignmentsReviewedByTeacher$(): Observable<List<Assignment>> {
    return this.store
      .select(store => store.dataState.assignments)
      .map((assignments: List<Assignment>) => assignments
        .filter(assignment => assignment.isTeacherReviewed())
        .toList()
      );
  }

  get submittedAssignments$(): Observable<List<Assignment>> {
    return this.assignments$
      .map(assignments => assignments
        .filter(assignment => assignment.isSubmitted() || assignment.isGraded())
        .toList()
      );
  }

  get isAssignmentsLoading$(): Observable<boolean> {
    return this.store.select(store => store.dataState.isAssignmentsLoading);
  }

  get isAssignmentSaving$(): Observable<boolean> {
    return this.store.select(store => store.dataState.isAssignmentsSaving);
  }

  get isAssignmentDeleting$(): Observable<boolean> {
    return this.store.select(store => store.dataState.isAssignmentsDeleting);
  }

  get isAssignmentGrading$(): Observable<boolean> {
    return this.store.select(store => store.dataState.isAssignmentGrading);
  }

}
