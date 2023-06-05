import {Component, OnInit} from '@angular/core';
import {AuthSelectors} from '../../../store/selectors/auth.selectors';
import {MatDialog} from '@angular/material';
import {ModalAdjustUserComponent} from '../../modals/modal-change-name/modal-change-name.component';
import {Store} from '@ngrx/store';
import {GlobalState} from '../../../store/states';
import {ChangeMyName, ChangeMyPassword} from '../../../store/actions/auth.actions';
import {ModalChangePasswordComponent} from '../../modals/modal-change-password/modal-change-password.component';
import {UserDialogType} from '../../../enums/UserDialogType';

@Component({
  selector: 'ac-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  constructor(public authSelectors: AuthSelectors, public dialog: MatDialog, public store: Store<GlobalState>) {
  }

  ngOnInit() {
  }

  changeName(): void {
    this.authSelectors.activeUserName$
      .first()
      .switchMap((userName: string) => this.dialog
        .open(ModalAdjustUserComponent, {
          width: '30em',
          data: {
            type: UserDialogType.NAME,
            value: userName,
            title: 'Changing User\'s Name',
            label: 'New name'
          }
        })
        .afterClosed()
        .filter(newName => newName !== null)
      )
      .subscribe((newName: string) => this.store.dispatch(new ChangeMyName({newName})));

  }

  changePassword(): void {
    this.dialog
      .open(ModalChangePasswordComponent, {width: '30em'})
      .afterClosed()
      .first()
      .filter(newName => newName)
      .subscribe((data: { password: string, newPassword: string }) =>
        this.store.dispatch(new ChangeMyPassword(data))
      );
  }

}
