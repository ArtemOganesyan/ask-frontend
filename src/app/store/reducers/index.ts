import {ActionReducerMap} from '@ngrx/store';
import {GlobalState} from '../states';
import {authReducer} from './auth.reducer';
import {dataReducer} from './data.reducer';
import {notificationReducer} from './notification.reducer';
import {studentReducer} from './student.reducer';

export const rootReducer: ActionReducerMap<GlobalState> = {
  authState: authReducer,
  dataState: dataReducer,
  notificationState: notificationReducer,
  studentState: studentReducer
};

