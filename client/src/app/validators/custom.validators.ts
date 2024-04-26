import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static timeOrderValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const openAmTime = convertToDate(group.get('openAmTime')?.value);
      const closeAmTime = convertToDate(group.get('closeAmTime')?.value);
      const openPmTime = convertToDate(group.get('openPmTime')?.value);
      const closePmTime = convertToDate(group.get('closePmTime')?.value);

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
        (openAmTime !== null &&
          closeAmTime !== null &&
          openPmTime !== null &&
          closePmTime !== null &&
          openAmTime < closeAmTime &&
          closeAmTime < openPmTime &&
          openPmTime < closePmTime) ||
        (openAmTime !== null &&
          closeAmTime === null &&
          openPmTime === null &&
          closePmTime !== null &&
          openAmTime < closePmTime);

      return isValid ? null : { timeOrder: "L'enchaînement des horaires n'est pas conforme" };
    };
  }
}

function convertToDate(timeString: string | null): Date | null {
  if (!timeString) {
    return null;
  }
  const [hours, minutes] = timeString.split(':').map(Number);
  const time = new Date();
  time.setHours(hours, minutes || 0, 0);
  return time;
}
