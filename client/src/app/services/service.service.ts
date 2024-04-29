import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public addService(service: Service): Observable<Service> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    let { serviceId, ...serviceInfo } = service;

    return this.http.post<Service>(`${this.apiURL}/services`, serviceInfo, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  public updateService(serviceId: number, service: Service): Observable<Service> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .put<Service>(`${this.apiURL}/services/${serviceId}`, service, httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }

  public deleteService(serviceId: number): Observable<Service> {
    return this.http.delete<Service>(`${this.apiURL}/services/${serviceId}`).pipe(
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
