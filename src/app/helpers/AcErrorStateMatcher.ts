import {FormControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

export class AcErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return control !== null && control.invalid && (control.touched || control.dirty);
  }
}
