import { Injectable } from '@angular/core';
import { SqlGlobalService } from './sql-global.service';
import { Review } from '@app/interfaces/review.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReviewService extends SqlGlobalService<Review> {
  constructor(http: HttpClient) {
    super(http, environment.apiURL + '/reviews');
  }
}
