import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {List} from 'immutable';

@Component({
  selector: 'ac-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {

  @Input() users: List<User>;

  constructor() { }

  ngOnInit() {
  }

}
