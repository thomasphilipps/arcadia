import { of, Observable } from 'rxjs';
import { environment } from '@environments/environment.development';

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

export { log, handleError, truncate };
