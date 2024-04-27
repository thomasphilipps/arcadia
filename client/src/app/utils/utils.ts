import { of, Observable } from 'rxjs';
import { environment } from '@environments/environment.development';

class UtilityModule {
  /**
   * Logs the response if not in production environment.
   * @param response The response to log.
   */
  static log(response: any): void {
    if (!environment.production) {
      console.table(response);
    }
  }

  /**
   * Handles errors by logging them if not in production environment and returns an Observable of a default error value.
   * @param error The error encountered.
   * @param errorValue The default value to return in case of an error.
   * @returns Observable of the provided errorValue.
   */
  static handleError<T>(error: Error, errorValue: T | any[]): Observable<any[] | T> {
    if (!environment.production) {
      console.error(error);
    }
    return of(errorValue as any[] | T);
  }
}

export { UtilityModule };
