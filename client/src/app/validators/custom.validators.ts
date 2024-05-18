import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '@app/interfaces/user.interface';

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
  static passwordComplexity(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      let conditionsMet = 0;
      const hasLowerCase = /[a-z]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /\W/.test(value);

      if (hasLowerCase) conditionsMet++;
      if (hasUpperCase) conditionsMet++;
      if (hasNumber) conditionsMet++;
      if (hasSpecialChar) conditionsMet++;

      const isValid = conditionsMet >= 3 && value.length >= 12;

      return isValid ? null : { passwordComplexity: 'Mot de passe trop faible' };
    };
  }

  static uniqueEmail(users: User[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const emailIsUnique = !users.some((user) => user.userEmail === control.value);

      return emailIsUnique ? null : { uniqueEmail: "L'email existe déjà" };
    };
  }

  static nameFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const namePattern =
        /^(?![ '-]+$)[a-zA-ZàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]{2}[a-zA-ZàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ\- ']*$/;
      const isValid = namePattern.test(value);

      return isValid
        ? null
        : {
            nameFormat:
              'La chaîne ne peut contenir que des lettres, espaces, apostrophes et tirets',
          };
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
