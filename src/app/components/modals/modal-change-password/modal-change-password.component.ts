import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalConfirmationComponent} from '../modal-confirmation/modal-confirmation.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormHelperService} from '../../../services/form-helper.service';
import {noWhitespace} from '../../../helpers/validators';

@Component({
  selector: 'ac-modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss']
})
export class ModalChangePasswordComponent implements OnInit {

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<ModalConfirmationComponent>,
              public formBuilder: FormBuilder,
              public fh: FormHelperService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, noWhitespace, Validators.minLength(5), Validators.maxLength(32)]],
      newPassword: ['', [Validators.required, noWhitespace, Validators.minLength(5), Validators.maxLength(32)]],
      confirmPassword: ['', [Validators.required, noWhitespace, Validators.minLength(5), Validators.maxLength(32), this.matchPassword.bind(this)]],
    });
  }

  public matchPassword(control: FormControl) {
    let email = control.value;
    if (this.form && email !== this.form.value.newPassword) {
      return {
        passwordMatchError: true
      };
    }
    return null;
  }

}
