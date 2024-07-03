import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '@app/components/templates/star-rating/star-rating.component';
import { Review } from '@app/interfaces/review.interface';
import { ReviewService } from '@app/services/review.service';

@Component({
  selector: 'arz-review-client',
  standalone: true,
  imports: [StarRatingComponent, DatePipe],
  templateUrl: './review-client.component.html',
  styleUrl: './review-client.component.scss',
})
export class ReviewClientComponent implements OnInit {
  reviews: Review[];
  review: Review = {} as Review;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.loadData();
    this.reviewService.getApprovedReviews().subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des reviews:', error);
      },
    });
  }
}
