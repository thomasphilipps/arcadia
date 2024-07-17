import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SqlFormComponent } from '@app/components/templates/sql-form/sql-form.component';
import { StarRatingComponent } from '@app/components/templates/star-rating/star-rating.component';
import { Review } from '@app/interfaces/review.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { ReviewService } from '@app/services/review.service';
import { toDate } from '@app/utils/utils';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'arz-review-client',
  standalone: true,
  imports: [StarRatingComponent, DatePipe, SqlFormComponent, MatButtonModule],
  templateUrl: './review-client.component.html',
  styleUrl: './review-client.component.scss',
})
export class ReviewClientComponent implements OnInit {
  reviews: Review[];
  review: Review = {} as Review;
  reviewConfig: SqlViewDataConfig<Review>;

  editingReviewId: number | null = null;

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<Review>;

  constructor(private reviewService: ReviewService) {
    this.reviewConfig = this.createReviewFormConfig();
  }

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

  createReviewFormConfig(): SqlViewDataConfig<Review> {
    const defaultConfig: SqlViewDataConfig<Review> = {
      label: 'Avis',
      data: this.reviewService.getApprovedReviews(),
      primaryKey: 'reviewId',
      formFields: [
        {
          label: 'Note',
          controlName: 'reviewRating',
          type: 'score',
          minValue: 1,
          maxValue: 5,
          validators: [Validators.required, Validators.min(1), Validators.max(5)],
          placeholder: 'Note (1-5)',
        },
        {
          label: 'Votre nom / pseudo',
          controlName: 'reviewAlias',
          type: 'text',
          maxLength: 32,
          validators: [Validators.required, Validators.maxLength(32)],
          placeholder: 'Votre nom / pseudo',
        },

        {
          label: 'Votre avis',
          controlName: 'reviewContent',
          type: 'textarea',
          maxLength: 1000,
          minRows: 3,
          maxRows: 10,
          validators: [Validators.required, Validators.maxLength(1000)],
          placeholder: 'Votre avis',
        },
      ],
    };
    return defaultConfig;
  }

  addReview(): void {
    const newReview: Partial<Review> = {
      reviewPostedOn: toDate(new Date()), // Initialisation de reviewPostedOn à la date du jour
      reviewApproved: false, // Initialisation de reviewApproved à false
    };

    this.editingReviewId = null;
    this.sqlFormComponent.editForm = true;
    this.sqlFormComponent.formTitle = 'Donnez votre avis';
    this.sqlFormComponent.initializeForm(newReview as Review); // Passer les valeurs initiales au formulaire
  }

  saveReview(review: Review): void {
    review.reviewRating = +review.reviewRating; // Convertir la note en nombre

    this.reviewService
      .createData(review)
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'enregistrement de l'avis: ", error);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          alert(
            'Votre avis a bien été enregistré. Il sera publié après validation par un administrateur.'
          );
        },
        complete: () => {
          this.editingReviewId = null;
          this.sqlFormComponent.onCancelEdit();
        },
      });
  }
}
