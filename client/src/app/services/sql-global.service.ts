import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

import { API_URL } from '@app/app.config';
import { DataService } from '@app/interfaces/dataService';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SqlGlobalService<T> implements DataService<T> {
  private apiBaseURL: string;
  private dataSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(private http: HttpClient, @Inject(API_URL) apiBaseURL: string) {
    this.apiBaseURL = apiBaseURL;
  }

  loadData() {
    this.http
      .get<T[]>(this.apiBaseURL)
      .pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, []))
      )
      .subscribe((data) => {
        this.dataSubject.next(data);
      });
  }

  getAllData(): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  updateData(itemId: number, item: T): Observable<T> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.http.put<T>(`${this.apiBaseURL}/${itemId}`, item, httpOptions).pipe(
      tap((response) => {
        this.log(response);
        this.loadData();
      }),
      catchError((error) => this.handleError(error, null))
    );
  }

  createData(item: T): Observable<T> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let { itemId, ...itemInfo } = item as any;

    return this.http.post<T>(this.apiBaseURL, itemInfo, httpOptions).pipe(
      tap((response) => {
        this.log(response);
        this.loadData();
      }),
      catchError((error) => this.handleError(error, null))
    );
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseURL}/${id}`).pipe(
      tap((response) => {
        this.log(response);
        this.loadData();
      }),
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
