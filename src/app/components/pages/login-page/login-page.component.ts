import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormHelperService} from '../../../services/form-helper.service';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {SignIn} from '../../../store/actions/auth.actions';
import {Subject} from 'rxjs/Subject';
import {AuthSelectors} from '../../../store/selectors/auth.selectors';
import {noWhitespace, emailFormat} from '../../../helpers/validators';

@Component({
  selector: 'ac-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy, AfterViewInit {

  public form: FormGroup;
  public showRegistration = false;
  private componentDestroyed = new Subject<boolean>();

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              public fh: FormHelperService,
              public store: Store<GlobalState>,
              public authSelectors: AuthSelectors) {
  }

  ngOnInit() {
    this.authSelectors
      .isAuthorized$
      .filter(isLoggedIn => isLoggedIn)
      .takeUntil(this.componentDestroyed)
      .take(1)
      .subscribe(() => this.router.navigate(['/home']));

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, emailFormat]],
      password: ['', [Validators.required, noWhitespace]]
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.showRegistration = true, 0);
  }

  public submit() {
    const formValue = this.form.value;

    if (this.form.invalid) {
      this.fh.markEachControlAsDirty(this.form);
      return;
    }

    const {email, password} = formValue;

    this.store.dispatch(new SignIn({email, password}));
  }

}
