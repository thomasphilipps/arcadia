import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { Service } from '@app/interfaces/service.interface';
import { SqlGlobalService } from './sql-global.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService extends SqlGlobalService<Service> {
  constructor(http: HttpClient) {
    super(http, environment.apiURL + '/services');
  }
}
