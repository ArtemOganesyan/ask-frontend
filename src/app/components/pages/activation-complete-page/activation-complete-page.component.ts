import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {ActivateAccount} from '../../../store/actions/auth.actions';
import {AuthSelectors} from '../../../store/selectors/auth.selectors';

@Component({
  selector: 'ac-activation-complete-page',
  templateUrl: './activation-complete-page.component.html',
  styleUrls: ['./activation-complete-page.component.scss']
})
export class ActivationCompletePageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              public router: Router,
              public store: Store<GlobalState>,
              public authSelectors: AuthSelectors
  ) {
  }

  ngOnInit() {
    this.activatedRoute
      .params
      .subscribe((params: { userId: string, activationCode: string }) =>
        this.store.dispatch(new ActivateAccount(params))
      );
  }

}
