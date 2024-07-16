import { of, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { DateTime } from 'luxon';

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

function isISODateString(dateString: string): boolean {
  // Essayer de créer un objet Date
  const date = new Date(dateString);

  // Vérifier si la date est invalide
  if (isNaN(date.getTime())) {
    return false;
  }

  // Vérifier si la chaîne est au format ISO 8601
  const isoFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return isoFormat.test(dateString);
}

function convertIsoDateToLocaleDate(data: string): string {
  if (!isISODateString(data)) {
    return data;
  }
  const date = new Date(data);
  return date.toLocaleDateString();
}

function toDate(input: string | Date | DateTime): Date {
  if (input instanceof Date) {
    return input;
  }

  if (DateTime.isDateTime(input)) {
    return input.toJSDate();
  }

  if (typeof input === 'string' && isISODateString(input)) {
    const date = DateTime.fromISO(input);
    return date.toJSDate();
  }

  throw new Error('Invalid date format');
}

export { log, handleError, truncate, convertIsoDateToLocaleDate, toDate };
