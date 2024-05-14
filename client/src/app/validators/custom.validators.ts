import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static timeOrderValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const openAmTime = convertToDate(group.get('openAm')?.value);
      const closeAmTime = convertToDate(group.get('closeAm')?.value);
      const openPmTime = convertToDate(group.get('openPm')?.value);
      const closePmTime = convertToDate(group.get('closePm')?.value);

      // Vérifications des plages horaires
      const isValidAmTime = (time: Date | null) => !time || time.getHours() <= 12;
      const isValidPmTime = (time: Date | null) => !time || time.getHours() > 12;

      const isValid =
        (!openPmTime &&
          !closePmTime &&
          openAmTime &&
          closeAmTime &&
          openAmTime < closeAmTime &&
          isValidAmTime(openAmTime) &&
          isValidAmTime(closeAmTime)) ||
        (!openAmTime &&
          !closeAmTime &&
          openPmTime &&
          closePmTime &&
          openPmTime < closePmTime &&
          isValidPmTime(openPmTime) &&
          isValidPmTime(closePmTime)) ||
        (openAmTime &&
          closeAmTime &&
          openPmTime &&
          closePmTime &&
          openAmTime < closeAmTime &&
          closeAmTime < openPmTime &&
          openPmTime < closePmTime &&
          isValidAmTime(openAmTime) &&
          isValidAmTime(closeAmTime) &&
          isValidPmTime(openPmTime) &&
          isValidPmTime(closePmTime)) ||
        (openAmTime &&
          !closeAmTime &&
          !openPmTime &&
          closePmTime &&
          openAmTime < closePmTime &&
          isValidAmTime(openAmTime) &&
          isValidPmTime(closePmTime)) ||
        (!openAmTime && !closeAmTime && !openPmTime && !closePmTime);

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
