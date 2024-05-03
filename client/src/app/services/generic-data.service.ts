import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@app/app.config';
import { DataService } from '@app/interfaces/dataService';
import { environment } from '@environments/environment.development';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericDataService<T> implements DataService<T> {
  private apiURL: string;

  constructor(private http: HttpClient, @Inject(API_URL) apiURL: string) {
    this.apiURL = apiURL;
  }

  getAllData(): Observable<T[]> {
    return this.http.get<T[]>(this.apiURL).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  createData(item: T): Observable<T> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let { itemId, ...itemInfo } = item as any;

    return this.http.post<T>(this.apiURL, itemInfo, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  updateData(itemId: number, item: T): Observable<T> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.http.put<T>(`${this.apiURL}/${itemId}`, item, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`).pipe(
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