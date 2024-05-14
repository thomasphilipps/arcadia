import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { Schedule } from '@interfaces/schedule.interface';
import { SqlGlobalService } from './sql-global.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService extends SqlGlobalService<Schedule> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiURL}/schedules`);
  }
}
