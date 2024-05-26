import { Component, OnInit, ViewChild } from '@angular/core';
import { Review } from '@app/interfaces/review.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { ReviewService } from '@app/services/review.service';
import { SqlFormComponent } from '../templates/sql-form/sql-form.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SqlDataTableComponent } from '../templates/sql-data-table/sql-data-table.component';
import { MatButtonModule } from '@angular/material/button';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'arz-review-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule, SqlDataTableComponent, SqlFormComponent, MatButtonModule],
  templateUrl: './review-admin.component.html',
  styleUrl: './review-admin.component.scss',
})
export class ReviewAdminComponent implements OnInit {
  reviews: Review[] = [];
  reviewConfig: SqlViewDataConfig<Review>;

  editingReview: Review | null = null;
  editingReviewId: number | null = null;

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<Review>;

  constructor(private reviewService: ReviewService) {
    this.reviewConfig = {
      label: 'Avis',
      data: this.reviewService.getAllData(),
      primaryKey: 'reviewId',
      booleanColumns: ['reviewApproved'],
      displayColumns: [
        {
          key: 'reviewAlias',
          label: "Nom de l'auteur",
        },
        {
          key: 'reviewRating',
          label: 'Note',
        },
        {
          key: 'reviewContent',
          label: 'Contenu',
        },
        {
          key: 'reviewPostedOn',
          label: 'Date de soumission',
        },
        {
          key: 'reviewApproved',
          label: 'Validée',
        },
        {
          key: 'approvedBy',
          label: 'Validée par',
        },
      ],
      actions: { view: true, edit: true, delete: true },
      sortable: true,
    };
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.loadData();
    this.reviewService.getAllData().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des avis', err);
      },
    });
  }

  addReview(): void {}

  viewReview(reviewId: number): void {}

  editReview(reviewId: number): void {}

  deleteReview(reviewId: number): void {}

  saveReview(review: Review): void {}
}
