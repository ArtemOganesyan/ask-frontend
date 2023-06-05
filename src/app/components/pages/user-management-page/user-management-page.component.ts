import {Component, OnInit} from '@angular/core';
import {DataSelectors} from '../../../store/selectors/data.selectors';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {LoadUsers} from '../../../store/actions/data.actions';

@Component({
  selector: 'ac-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss'],
})
export class UserManagementPageComponent implements OnInit {

  constructor(public dataSelectors: DataSelectors, public store: Store<GlobalState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadUsers());
  }

}
