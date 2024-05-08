import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specie } from '@app/interfaces/specie.interface';
import { environment } from '@environments/environment.development';
import { SqlGlobalService } from './sql-global.service';

@Injectable({
  providedIn: 'root',
})
export class SpecieService extends SqlGlobalService<Specie> {
  constructor(http: HttpClient) {
    super(http, environment.apiURL + '/species');
  }
}
