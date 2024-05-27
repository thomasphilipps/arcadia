import { Injectable } from '@angular/core';
import { SqlGlobalService } from './sql-global.service';
import { Review } from '@app/interfaces/review.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService extends SqlGlobalService<Review> {
  private approvedReviewsSubject = new BehaviorSubject<Review[]>([]);
  private unapprovedReviewsSubject = new BehaviorSubject<Review[]>([]);

  approvedReviews$ = this.approvedReviewsSubject.asObservable();
  unapprovedReviews$ = this.unapprovedReviewsSubject.asObservable();

  constructor(http: HttpClient) {
    super(http, environment.apiURL + '/reviews');
  }

  override loadData() {
    super.loadData();
    this.getAllData().subscribe((reviews) => {
      this.updateApprovedAndUnapprovedReviews(reviews);
    });
  }

  private updateApprovedAndUnapprovedReviews(reviews: Review[]) {
    const approved = reviews.filter((review) => review.reviewApproved);
    const unapproved = reviews.filter((review) => !review.reviewApproved);
    this.approvedReviewsSubject.next(approved);
    this.unapprovedReviewsSubject.next(unapproved);
  }

  getApprovedReviews(): Observable<Review[]> {
    return this.approvedReviews$;
  }

  getUnapprovedReviews(): Observable<Review[]> {
    return this.unapprovedReviews$;
  }
}
