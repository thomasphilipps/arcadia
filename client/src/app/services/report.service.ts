import { Injectable } from '@angular/core';
import { SqlGlobalService } from './sql-global.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { Observable, catchError } from 'rxjs';
import { VetReport } from '@app/interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportService extends SqlGlobalService<VetReport> {
  constructor(http: HttpClient) {
    super(http, environment.apiURL + '/reports');
  }

  getAnimalReports(animalId: string): Observable<VetReport> {
    return this.http
      .get<VetReport>(`${this.apiURL}/animals/${animalId}`)
      .pipe(catchError((error) => this.handleError(error, null)));
  }
}
