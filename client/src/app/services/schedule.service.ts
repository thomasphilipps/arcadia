import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { UtilityModule } from '../utils/utils';
import { environment } from '../../environments/environement.development';
import { Schedule } from '../interfaces/schedule.interface';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  public getAllSchedules(): Observable<any[] | Schedule[] | null> {
    return this.http.get<Schedule[]>(`${this.apiURL}/schedules`).pipe(
      tap((response) => UtilityModule.log(response)),
      catchError((error) => UtilityModule.handleError(error, null))
    );
  }

  public updateSchedule(dayId: number, schedule: Schedule): Observable<any[] | Schedule | null> {
    return this.http.put<Schedule>(`${this.apiURL}/schedules/${dayId}`, schedule).pipe(
      tap((response) => UtilityModule.log(response)),
      catchError((error) => UtilityModule.handleError(error, null))
    );
  }
}
