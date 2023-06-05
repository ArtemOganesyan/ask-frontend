import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {DeleteAssignment, LoadAssignments, LoadUsers} from '../../../store/actions/data.actions';
import {Observable} from 'rxjs/Observable';
import {Assignment} from '../../../models/assignment';
import {List} from 'immutable';
import {DataSelectors} from '../../../store/selectors/data.selectors';
import {User} from '../../../models/user';
import {Subscription} from 'rxjs/Subscription';
import {ModalConfirmationComponent} from '../../modals/modal-confirmation/modal-confirmation.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'ac-assignments-list-page',
  templateUrl: './assignments-list-page.component.html',
  styleUrls: ['./assignments-list-page.component.scss']
})
export class AssignmentsListPageComponent implements OnInit, OnDestroy {

  public assignmentGroups: List<List<Assignment>>;
  private trackingSubscription: Subscription;

  constructor(public store: Store<GlobalState>, public dataSelectors: DataSelectors, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadAssignments());
    this.store.dispatch(new LoadUsers());
    this.trackAssignments();
  }

  ngOnDestroy(): void {
    this.trackingSubscription.unsubscribe();
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

  public deleteAssignment(assignmentGroupID: string) {
    return this.dialog
      .open(ModalConfirmationComponent, {
        width: '30em',
        data: {
          text: `Are you sure you want to delete an Assignment? All students progress related to this assignment will be lost.`,
          action: 'Delete'
        }
      })
      .afterClosed()
      .filter(value => value === true)
      .subscribe(() => this.store.dispatch(new DeleteAssignment({assignmentGroupID})));
  }

  public trackAssignments(): void {
    this.trackingSubscription = this.dataSelectors
      .assignments$
      .map((assignments: List<Assignment>) => assignments
        .groupBy((assignment) => assignment.assignmentGroupID)
        .valueSeq()
        .sort((groupA, groupB) => groupA.get(0).createdMoment.isBefore(groupB.get(0).createdMoment) ? 1 : -1)
        .toList() as List<List<Assignment>>
      )
      .combineLatest(this.dataSelectors.users$)
      .map(([assignmentGroups, users]: [List<List<Assignment>>, List<User>]) => assignmentGroups
        .map(assignmentGroup => assignmentGroup
          .map(assignment => ({assignment, user: users.find(user => user.id === assignment.userId)}))
          .sort((a, b) => a.user && b.user ? a.user.compare(b.user) : 0)
          .map((combined) => combined.assignment)
          .toList()
        )
        .toList()
      )
      .subscribe(assignmentGroups => this.assignmentGroups = assignmentGroups);
  }

}
