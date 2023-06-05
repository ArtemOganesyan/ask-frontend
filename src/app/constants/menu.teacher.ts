import {List} from 'immutable';
import {IMenu} from '../interfaces/IMenu';

export const teacherMenu: List<IMenu> = List([
  {
    name: 'Home',
    icon: 'home',
    link: '/#/home'
  },
  {
    name: 'Submissions',
    icon: 'school',
    link: '/#/submissions/0'
  },
  {
    name: 'Assignments',
    icon: 'group_add',
    link: '/#/assignments'
  },
  {
    name: 'Quizzes',
    icon: 'edit',
    link: '/#/quizzes'
  },
  {
    name: 'User\'s Management',
    icon: 'group',
    link: '/#/users-management'
  },
  {
    name: 'Settings',
    icon: 'settings',
    link: '/#/settings'
  }
]);
