import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '@environments/environment.development';
import { Service } from '@app/interfaces/service.interface';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  public getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiURL}/services`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  private log(response: any) {
    if (!environment.production) {
      console.table(response);
    }
  }

  private handleError(error: Error, errorValue: [] | any) {
    if (!environment.production) {
      console.error(error);
    }
    return of(errorValue);
  }
}
