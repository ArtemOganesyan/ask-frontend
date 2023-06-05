import { FormGroup } from '@angular/forms';

export class CustomValidator {

  static passwordValidator(firstFieldName: string, secondFieldName: string, errorKey: string) {
    return (fg: FormGroup) => {
      const firstField = fg.controls[firstFieldName];
      const secondField = fg.controls[secondFieldName];

      if (firstField && secondField) {
        if (firstField.value || secondField.value) {
          if (firstField.value !== secondField.value) {
            firstField.setErrors({
              ...firstField.errors,
              ...{ [errorKey]: true }
            });

            secondField.setErrors({
              ...secondField.errors,
              ...{ [errorKey]: true }
            });
          } else {
            let fieldOneError = { ...firstField.errors };
            delete fieldOneError[errorKey];

            fieldOneError = Object.keys(fieldOneError).length > 0 ? fieldOneError : null;
            firstField.setErrors(fieldOneError);

            let fieldTwoError = { ...secondField.errors };
            delete fieldTwoError[errorKey];

            fieldTwoError = Object.keys(fieldTwoError).length > 0 ? fieldTwoError : null;
            secondField.setErrors(fieldTwoError);
          }
        }
      }
    };
  }

}
