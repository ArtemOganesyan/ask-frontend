import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataSelectors} from '../../../store/selectors/data.selectors';
import {User} from '../../../models/user';
import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {ChangeUserGroup, ChangeUserName, ChangeUserRole, DeleteUser, LoadAssignments, LoadUsers} from '../../../store/actions/data.actions';
import {MatDialog} from '@angular/material';
import {ModalConfirmationComponent} from '../../modals/modal-confirmation/modal-confirmation.component';
import {UserRole} from '../../../enums/UserRole';
import {AuthSelectors} from '../../../store/selectors/auth.selectors';
import {ModalNotificationComponent} from '../../modals/modal-notification/modal-notification.component';
import {ModalAdjustUserComponent} from '../../modals/modal-change-name/modal-change-name.component';
import {Assignment} from '../../../models/assignment';
import {UserDialogType} from '../../../enums/UserDialogType';

@Component({
  selector: 'ac-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {

  public user$: Observable<User>;
  public userAssignments$: Observable<List<Assignment>>;

  constructor(public activatedRoute: ActivatedRoute,
              public dataSelectors: DataSelectors,
              public authSelectors: AuthSelectors,
              public store: Store<GlobalState>,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSelectors.users$
      .first()
      .filter(users => users.count() === 0)
      .subscribe(() => this.store.dispatch(new LoadUsers()));

    this.user$ = this.activatedRoute.params
      .map(params => Number(params['id']))
      .combineLatest(this.dataSelectors.users$)
      .map(([id, users]: [number, List<User>]) => users.find(user => user.id === id));

    this.userAssignments$ = this.user$
      .combineLatest(this.dataSelectors.assignments$)
      .map(([user, assignments]: [User, List<Assignment>]) => assignments
        .filter(assignment => user && assignment.userId === user.id)
        .toList()
      );

    this.store.dispatch(new LoadAssignments());
  }

  changeUserRole() {
    this.user$
      .withLatestFrom(this.authSelectors.activeUserId$)
      .first()
      .switchMap(([user, activeUserId] : [User, number]) => user.id === activeUserId
        ? this.showCannotChangeYourself$()
        : this.showSwitchRoleDialog$(user)
      )
      .subscribe((user) => this.store.dispatch(new ChangeUserRole({
        user,
        role: user.isStudent ? UserRole.TEACHER : UserRole.STUDENT
      })));
  }

  changeUserName() {
    this.user$
      .withLatestFrom(this.authSelectors.activeUserId$)
      .first()
      .switchMap(([user, activeUserId] : [User, number]): Observable<any> => user.id === activeUserId
        ? this.showCannotChangeYourself$()
        : this.showChangeNameDialog$(user)
      )
      .subscribe((data: {user: User; name: string}) => this.store.dispatch(new ChangeUserName(data)));
  }

  changeUserGroup() {
    this.user$
      .withLatestFrom(this.authSelectors.activeUserId$)
      .first()
      .switchMap(([user, activeUserId] : [User, number]): Observable<any> => user.id === activeUserId
        ? this.showCannotChangeYourself$()
        : this.showChangeGroupDialog$(user)
      )
      .subscribe((data: {user: User; group: string}) => this.store.dispatch(new ChangeUserGroup(data)));
  }

  deleteUser() {
    this.user$
      .withLatestFrom(this.authSelectors.activeUserId$)
      .first()
      .switchMap(([user, activeUserId] : [User, number]) => user.id === activeUserId
        ? this.showCannotChangeYourself$()
        : this.showDeleteUserDialog$(user)
      )
      .subscribe((user) => this.store.dispatch(new DeleteUser({userId: user.id})));
  }

  private showSwitchRoleDialog$(user: User): Observable<User> {
    return this.dialog
      .open(ModalConfirmationComponent, {
        width: '30em',
        data: {
          text: user.isStudent
            ? 'User will become a TEACHER and have access to all ADMIN features. Are you sure want to change ROLE for this user?'
            : 'User will become a STUDENT and lose access to all ADMIN features. Are you sure want to change ROLE for this user?',
          action: 'Change Role'
        }
      })
      .afterClosed()
      .filter(value => value === true)
      .map(() => user);
  }

  private showChangeNameDialog$(user: User): Observable<{user: User, name: string}> {
    return this.dialog
      .open(ModalAdjustUserComponent, {
        width: '30em',
        data: {
          type: UserDialogType.NAME,
          value: user.name,
          title: 'Changing User\'s Name',
          label: 'New User\'s Name'
        }
      })
      .afterClosed()
      .filter(name => name !== null)
      .map((name) => ({user, name}));
  }

  private showChangeGroupDialog$(user: User): Observable<{user: User, group: string}> {
    return this.dialog
      .open(ModalAdjustUserComponent, {
        width: '30em',
        data: {
          type: UserDialogType.GROUP,
          value: user.group,
          title: 'Changing User\'s Group',
          label: 'New User\'s Group'
        }
      })
      .afterClosed()
      .filter(group => group !== null)
      .map((group) => ({user, group}));
  }

  private showCannotChangeYourself$(): Observable<User> {
    return this.dialog
      .open(ModalNotificationComponent, {
        width: '30em',
        data: {
          text: 'This is you. You cannot adjust yourself from User\'s Management. Please go to Setting page to see the options.',
          action: 'Ok'
        }
      })
      .afterClosed()
      .filter(value => value === true);
  }

  private showDeleteUserDialog$(user: User): Observable<User> {
    return this.dialog
      .open(ModalConfirmationComponent, {
        width: '30em',
        data: {
          text: `Are you sure you want to delete ${user.name}?`,
          action: 'Delete'
        }
      })
      .afterClosed()
      .filter(value => value === true)
      .map(() => user);
  }

}
