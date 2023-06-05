import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material';
import { UserDialogType } from '../../../enums/UserDialogType';
import { eachName } from '../../../helpers/validators';
import { FormHelperService } from '../../../services/form-helper.service';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'ac-modal-adjust-user',
  templateUrl: './modal-adjust-user.component.html',
  styleUrls: ['./modal-adjust-user.component.scss'],
})
export class ModalAdjustUserComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<ModalConfirmationComponent>,
    private readonly formBuilder: FormBuilder,
    public readonly fh: FormHelperService,
    @Inject(MAT_DIALOG_DATA) public readonly data: any,
  ) {
  }

  ngOnInit() {
    const validators: any[] = this.data.type === UserDialogType.NAME
      ? [Validators.required, Validators.maxLength(100), eachName]
      : [Validators.required, Validators.maxLength(6)];

    this.form = this.formBuilder.group({
      name: [this.data.value, validators],
    });
  }

}
