import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { eachName, emailFormat, noWhitespace } from '../../../helpers/validators';
import { FormHelperService } from '../../../services/form-helper.service';
import { Registration } from '../../../store/actions/auth.actions';
import { AuthSelectors } from '../../../store/selectors/auth.selectors';
import { GlobalState } from '../../../store/states';
import { CustomValidator } from './passwordValidator';

@Component({
  selector: 'ac-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: [ './registration-page.component.scss' ]
})
export class RegistrationPageComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, public fh: FormHelperService, public store: Store<GlobalState>, public authSelectors: AuthSelectors) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: [ '', [ Validators.required, eachName ] ],
      lastName: [ '', [ Validators.required, eachName ] ],
      email: [ '', [ Validators.required, emailFormat ] ],
      group: [ '', [ Validators.required, Validators.maxLength(6), noWhitespace ] ],
      password: [ '', [ Validators.required, Validators.minLength(5), Validators.maxLength(32), noWhitespace ] ],
      confirmPassword: [ '', [ Validators.required, Validators.minLength(5), Validators.maxLength(32), noWhitespace ] ]
    }, {
      validator: CustomValidator.passwordValidator(
        'password',
        'confirmPassword',
        'passwordMatchError'
      )
    });
  }

  public submit() {
    const formValue = this.form.value;

    if (this.form.invalid) {
      this.fh.markEachControlAsDirty(this.form);
      return;
    }

    const { email, password, group, firstName, lastName } = formValue;
    const name = `${ firstName } ${ lastName }`;

    this.store.dispatch(new Registration({ user: { email, password, name, group } }));
  }

}
