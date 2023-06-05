import {Notification} from '../../models/notification';

export interface NotificationState {
  notification: Notification;
}

export const initNotificationState: NotificationState = {
  notification: null
};
