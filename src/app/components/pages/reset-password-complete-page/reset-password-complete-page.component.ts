import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthSelectors} from '../../../store/selectors/auth.selectors';
import {Store} from '@ngrx/store';
import {GlobalState} from '../../../store/states';
import {FormHelperService} from '../../../services/form-helper.service';
import {ResetPassword} from '../../../store/actions/auth.actions';
import {ActivatedRoute} from '@angular/router';
import {noWhitespace} from '../../../helpers/validators';

@Component({
  selector: 'ac-reset-password-complete-page',
  templateUrl: './reset-password-complete-page.component.html',
  styleUrls: ['./reset-password-complete-page.component.scss']
})
export class ResetPasswordCompletePageComponent implements OnInit {

  public form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              public fh: FormHelperService,
              public store: Store<GlobalState>,
              public authSelectors: AuthSelectors) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, noWhitespace, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5), noWhitespace, this.matchPassword.bind(this)]],
    });
  }

  public submit() {
    const formValue = this.form.value;

    if (this.form.invalid) {
      this.fh.markEachControlAsDirty(this.form);
      return;
    }

    const {password} = formValue;

    this.store.dispatch(new ResetPassword({
      password,
      userId: this.activatedRoute.snapshot.params['userId'],
      activationCode: this.activatedRoute.snapshot.params['activationCode']
    }));
  }

  public matchPassword(control: FormControl) {
    let email = control.value;
    if (this.form && email !== this.form.value.password) {
      return {
        passwordMatchError: true
      };
    }
    return null;
  }

}
