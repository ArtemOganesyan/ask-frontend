import {List} from 'immutable';
import {IMenu} from '../interfaces/IMenu';

export const studentMenu: List<IMenu> = List([
  {
    name: 'Home',
    icon: 'home',
    link: '/#/home'
  },
  {
    name: 'My Assignments',
    icon: 'border_color',
    link: '/#/my-assignments'
  },
  {
    name: 'My Grades',
    icon: 'offline_pin',
    link: '/#/my-grades'
  },
  {
    name: 'Settings',
    icon: 'settings',
    link: '/#/settings'
  }
]);
