import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataSelectors} from '../../../store/selectors/data.selectors';
import {LoadAssignments, LoadUsers} from '../../../store/actions/data.actions';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {Assignment} from '../../../models/assignment';
import {List} from 'immutable';
import {User} from '../../../models/user';

const ALL_GROUPS = 'All Groups';

@Component({
  selector: 'ac-submissions-list-page',
  templateUrl: './submissions-list-page.component.html',
  styleUrls: ['./submissions-list-page.component.scss']
})
export class SubmissionsListPageComponent implements OnInit, OnDestroy {

  public readonly ALL_GROUPS: string = ALL_GROUPS;
  public index$: Observable<number>;
  public groupFilter$: Observable<string>;

  constructor(public dataSelectors: DataSelectors,
              public store: Store<GlobalState>,
              public activatedRoute: ActivatedRoute,
              public router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadAssignments());
    this.store.dispatch(new LoadUsers());

    this.index$ = this.activatedRoute
      .params
      .map(params => Number(params['index']));

    this.groupFilter$ = this.activatedRoute
      .params
      .map(params => params['group-filter'] || ALL_GROUPS);
  }

  ngOnDestroy(): void {
  }

  public getUserName(id: number): Observable<string> {
    return this.dataSelectors.users$
      .map(users => users.find(user => user.id === id) || null)
      .filter(user => user !== null)
      .map(user => user.name);
  }

  public getUserGroup(id: number): Observable<string> {
    return this.dataSelectors.users$
      .map(users => users.find(user => user.id === id) || null)
      .filter(user => user !== null)
      .map(user => user.group);
  }

  public navigateToTab(index: number): void {
    this.router.navigate([`/submissions/${index}`]);
  }

  public getLink(assignment: Assignment): Observable<string> {
    return this.index$
      .combineLatest(this.groupFilter$)
      .map(([index, filter]: [Number, string]) =>
        `/#/grade/${assignment.id}?back=submissions/${index}${filter === ALL_GROUPS ? '' : ';group-filter=' + filter}`
      );
  }

  public filterByGroup(group: string): void {
    this.index$
      .first()
      .subscribe((index) => this.router.navigate([
        `/submissions/${index}`,
        group === ALL_GROUPS ? {} : {'group-filter': group}
      ]));
  }

  public applyFilter(assignments$: Observable<List<Assignment>>): Observable<List<Assignment>> {
    return assignments$
      .combineLatest(this.groupFilter$, this.dataSelectors.users$)
      .map(([assignments, filter, users]: [List<Assignment>, string, List<User>]) => assignments
        .filter(assignment => {
          const user = users.find(user => user.id === assignment.userId);

          return (user && user.group === filter) || (filter === ALL_GROUPS);
        })
        .toList()
      );
  }

  public giveGroupOptions(assignments$: Observable<List<Assignment>>): Observable<List<string>> {
    return assignments$
      .combineLatest(this.dataSelectors.students$)
      .map(([assignments, users]: [List<Assignment>, List<User>]) => assignments
        .map(assignment => users.find(user => user.id === assignment.userId))
        .filter(user => Boolean(user))
        .toList()
      )
      .map((users: List<User>) => users
        .map(user => user.group)
        .toSet()
        .toList()
        .unshift(ALL_GROUPS)
      );
  }

}
