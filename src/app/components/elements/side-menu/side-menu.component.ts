import {Component, OnInit} from '@angular/core';
import {AuthSelectors} from '../../../store/selectors/auth.selectors';
import {List} from 'immutable';
import {IMenu} from '../../../interfaces/IMenu';
import {Observable} from 'rxjs/Observable';
import {UserRole} from '../../../enums/UserRole';
import {teacherMenu} from '../../../constants/menu.teacher';
import {studentMenu} from '../../../constants/menu.student';
import {environment} from '../../../../environments/environment';
import {SignOut} from '../../../store/actions/auth.actions';
import {GlobalState} from '../../../store/states/index';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material';
import {ModalConfirmationComponent} from '../../modals/modal-confirmation/modal-confirmation.component';
import {ModalNotificationComponent} from '../../modals/modal-notification/modal-notification.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ac-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  public version = environment.version;

  constructor(public authSelectors: AuthSelectors, public store: Store<GlobalState>, public dialog: MatDialog,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  get menu$(): Observable<List<IMenu>> {
    return this.authSelectors.activeUserRole$
      .map(userRole => userRole === UserRole.TEACHER
        ? teacherMenu
        : studentMenu
      );
  }

  clickLogOut(): void {
    (window.location.hash.indexOf('#/quiz-builder') === 0
      ? this.logOutNotAvailable
      : this.logOut).call(this);
  }

  logOut() {
    this.dialog
      .open(ModalConfirmationComponent, {
        width: '20em',
        data: {
          text: 'Are you sure want to Log Out?',
          action: 'Log Out'
        }
      })
      .afterClosed()
      .filter(value => value === true)
      .subscribe(() => this.store.dispatch(new SignOut()));
  }

  logOutNotAvailable() {
    this.dialog
      .open(ModalNotificationComponent, {
        width: '30em',
        data: {
          text: 'Cannot Log out now. Please exit from Quizz edit mode first.',
          action: 'Ok'
        }
      })
      .afterClosed()
      .subscribe(() => {
      });
  }

}
