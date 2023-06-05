import {initNotificationState, NotificationState} from '../states/notification.states';
import {NotificationActions, NotificationActionTypes} from '../actions/notification.actions';
import {Notification} from '../../models/notification'
import {NotificationType} from '../../enums/NotificationType';

export function notificationReducer(state = initNotificationState, action: NotificationActions): NotificationState {
  switch (action.type) {

    case NotificationActionTypes.SHOW_NOTIFICATION: {
      return {...state, notification: new Notification(action.payload.type, action.payload.message)}
    }

    case NotificationActionTypes.SHOW_NOTIFICATION_ERROR: {
      return {...state, notification: new Notification(NotificationType.ERROR, action.payload.message)}
    }

    default: {
      return state;
    }
  }
}
