import {Action} from '@ngrx/store';
import {NotificationType} from '../../enums/NotificationType';

export enum NotificationActionTypes {

  SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
  SHOW_NOTIFICATION_ERROR = 'SHOW_NOTIFICATION_ERROR'

}

export class ShowNotification implements Action {
  readonly type = NotificationActionTypes.SHOW_NOTIFICATION;

  constructor(public payload: { message: string, type: NotificationType }) {
  }
}

export class ShowNotificationError implements Action {
  readonly type = NotificationActionTypes.SHOW_NOTIFICATION_ERROR;

  constructor(public payload: { message: string }) {
  }
}

export type NotificationActions = ShowNotification | ShowNotificationError;
