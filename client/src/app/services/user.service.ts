import { Injectable } from '@angular/core';
import { SqlGlobalService } from './sql-global.service';
import { User } from '@app/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService extends SqlGlobalService<User> {
  constructor(http: HttpClient) {
    super(http, environment.apiURL + '/users');
  }
}
