import {AuthEffects} from './auth.effects';
import {NotificationEffects} from './notification.effects';
import {DataEffects} from './data.effects';
import {StudentEffects} from './student.effects';

export const rootEffects: any[] = [AuthEffects, NotificationEffects, DataEffects, StudentEffects];
