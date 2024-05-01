import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '@environments/environment.development';
import { Service } from '@app/interfaces/service.interface';
import { GenericDataService } from './generic-data.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService extends GenericDataService<Service> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiURL}/services`);
  }

  public getAllServices(): Observable<Service[]> {
    return this.getAllData();
  }

  public createService(service: Service): Observable<Service> {
    return this.createData(service);
  }

  public updateService(serviceId: number, service: Service): Observable<Service> {
    return this.updateData(serviceId, service);
  }

  public deleteService(serviceId: number): Observable<any> {
    return this.deleteData(serviceId);
  }
}
