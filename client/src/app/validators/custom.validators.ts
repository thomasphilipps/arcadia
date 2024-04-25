import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static timeOrderValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const openAmTime = group.get('openAmTime')?.value;
      const closeAmTime = group.get('closeAmTime')?.value;
      const openPmTime = group.get('openPmTime')?.value;
      const closePmTime = group.get('closePmTime')?.value;

      const isValid: boolean =
        (!openPmTime &&
          !closePmTime &&
          openAmTime !== null &&
          closeAmTime !== null &&
          openAmTime < closeAmTime) ||
        (!openAmTime &&
          !closeAmTime &&
          openPmTime !== null &&
          closePmTime !== null &&
          openPmTime < closePmTime) ||
        (openAmTime < closeAmTime && closeAmTime < openPmTime && openPmTime < closePmTime) ||
        (openAmTime !== null &&
          !closeAmTime &&
          !openPmTime &&
          closePmTime !== null &&
          openAmTime < closePmTime);

      return isValid ? null : { timeOrder: true };
    };
  }
}
