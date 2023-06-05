import {AuthState} from './auth.states';
import {DataState} from './data.states';
import {NotificationState} from './notification.states';
import {StudentState} from './student.states';

export interface GlobalState {
  authState: AuthState,
  dataState: DataState,
  notificationState: NotificationState
  studentState: StudentState
}
