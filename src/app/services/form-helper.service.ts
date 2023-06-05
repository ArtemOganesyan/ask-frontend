import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
} from '@angular/forms';

@Injectable()
export class FormHelperService {

  constructor() {
  }

  public hasError(form: FormGroup, controlName: string): boolean {
    const control: AbstractControl | null = form.get(controlName);

    return control.invalid && (control.dirty || control.touched);
  }

  public getError(form: FormGroup, controlName: string): string {
    if (!form.get(controlName) || !form.get(controlName).errors) {
      return '';
    }

    if (form.get(controlName).errors.required) {
      return 'This field is required';
    }

    if (form.get(controlName).errors.whitespace) {
      return 'Whitespaces are not allowed';
    }

    if (form.get(controlName).errors.onlyLatin) {
      return 'Should contain only latin characters';
    }

    // todo: not correct! see "eachName" validator!
    // see: #ACA-131
    if (form.get(controlName).errors.fullName) {
      return 'Should contain only first and last name latin characters';
    }

    if (form.get(controlName).errors.eachName) {
      return 'Should contain only latin characters, space or numbers';
    }

    if (form.get(controlName).errors.emailFormat) {
      return 'Should be a valid email address';
    }

    if (form.get(controlName).errors.minlength) {
      return `Too short. Should be at least 5 to 32 characters`;
    }

    // maxlength errorObject:
    // {
    //   "requiredLength": 6,
    //   "actualLength": 14
    // }
    if (form.get(controlName).errors.maxlength) {
      const errorObject = form.get(controlName).errors.maxlength;
      const isSix = errorObject.requiredLength === 6;

      if (isSix) {
        return 'Too long. Should be at least 1 to 6 characters';
      }

      return 'Too long. Should be at least 5 to 32 characters';
    }

    if (form.get(controlName).errors.min) {
      return `Value should >= ${form.get(controlName).errors.min['min']}`;
    }

    if (form.get(controlName).errors.max) {
      return `Value should <= ${form.get(controlName).errors.max['max']}`;
    }

    if (form.get(controlName).errors.passwordMatchError) {
      return `Entered passwords should match`;
    }

    return '';
  }

  public markEachControlAsDirty(form: FormGroup) {
    for (let controlName of Object.keys(form.value)) {
      if ((form.controls[controlName] as FormArray).length) {
        for (let i = 0; i < (form.controls[controlName] as FormArray).length; i++) {
          this.markEachControlAsDirty((form.controls[controlName] as FormArray).controls[i] as FormGroup);
        }
      } else {
        form.controls[controlName].markAsDirty();
      }
    }
  }

  markEachControlAsClean(form: FormGroup) {
    for (let controlName of Object.keys(form.value)) {
      if ((form.controls[controlName] as FormArray).length) {
        for (let i = 0; i < (form.controls[controlName] as FormArray).length; i++) {
          this.markEachControlAsClean((form.controls[controlName] as FormArray).controls[i] as FormGroup);
        }
      } else {
        form.controls[controlName].markAsPristine();
      }
    }
  }

  public markEachControlAsTouched(form: FormGroup) {
    for (let controlName of Object.keys(form.value)) {
      if ((form.controls[controlName] as FormArray).length) {
        for (let i = 0; i < (form.controls[controlName] as FormArray).length; i++) {
          this.markEachControlAsTouched((form.controls[controlName] as FormArray).controls[i] as FormGroup);
        }
      } else {
        form.controls[controlName].markAsTouched();
      }
    }
  }

  getFirstError(form: FormGroup) {
    let error = null;

    for (let controlName of Object.keys(form.value)) {
      if ((form.controls[controlName] as FormArray).length) {
        for (let i = 0; i < (form.controls[controlName] as FormArray).length; i++) {
          this.getFirstError((form.controls[controlName] as FormArray).controls[i] as FormGroup);
        }
      } else {
        error = error || (this.getError(form, controlName) ? `Error in [ ${controlName} ]:${this.getError(form, controlName)} ` : null);
      }
    }

    return error || null;
  }
}
