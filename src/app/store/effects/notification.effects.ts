import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {NotificationActionTypes, ShowNotificationError} from '../actions/notification.actions';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class NotificationEffects {

  constructor(private actions$: Actions,
              public snackBar: MatSnackBar) {
  }

  @Effect({dispatch: false})
  showError$ = this.actions$
    .ofType(NotificationActionTypes.SHOW_NOTIFICATION_ERROR)
    .map((action: ShowNotificationError) => action.payload.message)
    .do((message: string) => this.snackBar.open(message, 'X',{
      duration: 10000,
      panelClass: 'error'
    }));

}
