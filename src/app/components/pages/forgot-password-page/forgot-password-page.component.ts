import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthSelectors} from '../../../store/selectors/auth.selectors';
import {Store} from '@ngrx/store';
import {GlobalState} from '../../../store/states';
import {FormHelperService} from '../../../services/form-helper.service';
import {ForgotPassword} from '../../../store/actions/auth.actions';

@Component({
  selector: 'ac-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, public fh: FormHelperService, public store: Store<GlobalState>, public authSelectors: AuthSelectors) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public submit() {
    const formValue = this.form.value;

    if (this.form.invalid) {
      this.fh.markEachControlAsDirty(this.form);
      return;
    }

    const {email} = formValue;

    this.store.dispatch(new ForgotPassword({email}));
  }

}
