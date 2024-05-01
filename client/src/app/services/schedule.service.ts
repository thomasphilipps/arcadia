import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.development';
import { Schedule } from '@interfaces/schedule.interface';
import { GenericDataService } from './generic-data.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService extends GenericDataService<Schedule> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiURL}/schedules`);
  }

  public getAllSchedules(): Observable<Schedule[]> {
    return this.getAllData();
  }

  public updateSchedule(scheduleId: number, schedule: Schedule): Observable<Schedule> {
    return this.updateData(scheduleId, schedule);
  }
}
