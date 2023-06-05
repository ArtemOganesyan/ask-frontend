import {Component, OnInit} from '@angular/core';
import {fadeAnimation} from './router.animations';
import {CheckAuthorization} from './store/actions/auth.actions';
import {GlobalState} from './store/states';
import {Store} from '@ngrx/store';
import {AuthSelectors} from './store/selectors/auth.selectors';
import {DataSelectors} from './store/selectors/data.selectors';
import {environment} from '../environments/environment';

@Component({
  selector: 'ac-root',
  animations: [fadeAnimation],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isStaging: boolean = environment.isStaging;
  public environmentName: string = environment.environmentName;

  constructor(public store: Store<GlobalState>,
              public authSelectors: AuthSelectors,
              public dataSelectors: DataSelectors) {
  }

  ngOnInit(): void {
    this.store.dispatch(new CheckAuthorization());
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }


}
