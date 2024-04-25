import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';
import { environment } from '@environments/environment.development';
import { Schedule } from '@interfaces/schedule.interface';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  public getAllSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiURL}/schedules`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  public updateSchedule(dayId: number, schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiURL}/schedules/${dayId}`, schedule).pipe(
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
