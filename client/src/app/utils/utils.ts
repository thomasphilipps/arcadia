import { of, Observable } from 'rxjs';
import { environment } from '@environments/environment.development';
import { FormGroup } from '@angular/forms';

function log(response: any): void {
  if (!environment.production) {
    console.table(response);
  }
}

function handleError<T>(error: Error, errorValue: T | any[]): Observable<any[] | T> {
  if (!environment.production) {
    console.error(error);
  }
  return of(errorValue as any[] | T);
}

function truncate(text: string | null, limit: number = 50): string | null {
  if (!text) return text;
  return text.length > limit ? text.slice(0, limit) + '...' : text;
}

function getFormValidationErrors(formGroup: FormGroup): string[] {
  const errorMessages: string[] = [];

  Object.keys(formGroup.controls).forEach((key) => {
    const controlErrors = formGroup.get(key)?.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach((keyError) => {
        switch (keyError) {
          case 'required':
            errorMessages.push(`${key} est requis`);
            break;
          case 'maxlength':
            const maxLength = controlErrors['maxlength'].requiredLength;
            errorMessages.push(`${key} doit contenir au maximum ${maxLength} caractères`);
            break;
        }
      });
    }
  });

  return errorMessages;
}

export { log, handleError, truncate, getFormValidationErrors };
