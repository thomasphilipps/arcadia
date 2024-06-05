import { Injectable } from '@angular/core';

import { Observable, catchError } from 'rxjs';

import { SqlGlobalService } from './sql-global.service';
import { Feeding } from '@app/interfaces/feeding.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FeedingService extends SqlGlobalService<Feeding> {
  constructor(http: HttpClient) {
    super(http, environment.apiURL + '/feedings');
  }

  getAnimalFeedings(animalId: string): Observable<Feeding> {
    return this.http
      .get<Feeding>(`${this.apiURL}/feedings/animal/${animalId}`)
      .pipe(catchError((error) => this.handleError(error, null)));
  }
}
