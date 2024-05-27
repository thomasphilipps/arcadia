import { Component, OnInit, ViewChild } from '@angular/core';
import { Review } from '@app/interfaces/review.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { ReviewService } from '@app/services/review.service';
import { SqlFormComponent } from '@templates/sql-form/sql-form.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SqlDataTableComponent } from '@templates/sql-data-table/sql-data-table.component';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'arz-review-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SqlDataTableComponent,
    SqlFormComponent,
    MatButtonModule,
    MatExpansionModule,
  ],
  templateUrl: './review-admin.component.html',
  styleUrls: ['./review-admin.component.scss'],
})
export class ReviewAdminComponent implements OnInit {
  private reviewsSubjectApproved = new BehaviorSubject<Review[]>([]);
  private reviewsSubjectUnapproved = new BehaviorSubject<Review[]>([]);

  reviewConfigApproved: SqlViewDataConfig<Review>;
  reviewConfigUnapproved: SqlViewDataConfig<Review>;

  editingReview: Review | null = null;
  editingReviewId: number | null = null;

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<Review>;

  constructor(private reviewService: ReviewService) {
    this.reviewConfigApproved = {
      label: 'Avis Approuvés',
      data: this.reviewsSubjectApproved.asObservable(),
      primaryKey: 'reviewId',
      booleanColumns: ['reviewApproved'],
      displayColumns: [
        { key: 'reviewAlias', label: "Nom de l'auteur" },
        { key: 'reviewRating', label: 'Note' },
        { key: 'reviewContent', label: 'Contenu' },
        { key: 'reviewPostedOn', label: 'Date de soumission' },
        { key: 'reviewApproved', label: 'Validée' },
        { key: 'approvedBy', label: 'Validée par' },
      ],
      actions: { view: true, edit: true, delete: true },
      sortable: true,
    };

    this.reviewConfigUnapproved = {
      label: 'Avis Non Approuvés',
      data: this.reviewsSubjectUnapproved.asObservable(),
      primaryKey: 'reviewId',
      booleanColumns: ['reviewApproved'],
      displayColumns: [
        { key: 'reviewAlias', label: "Nom de l'auteur" },
        { key: 'reviewRating', label: 'Note' },
        { key: 'reviewContent', label: 'Contenu' },
        { key: 'reviewPostedOn', label: 'Date de soumission' },
        { key: 'reviewApproved', label: 'Validée' },
        { key: 'approvedBy', label: 'Validée par' },
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
        const approvedReviews = reviews.filter((review) => review.reviewApproved);
        const unapprovedReviews = reviews.filter((review) => !review.reviewApproved);

        this.reviewsSubjectApproved.next(approvedReviews);
        this.reviewsSubjectUnapproved.next(unapprovedReviews);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des avis', err);
      },
    });
  }

  //viewReview(reviewId: number): void {}

  viewReview(reviewId: number): void {
    const review =
      this.reviewsSubjectApproved.getValue().find((review) => review.reviewId === reviewId) ||
      this.reviewsSubjectUnapproved.getValue().find((review) => review.reviewId === reviewId);
    if (review) {
      alert(
        `Nom de l'auteur: ${review.reviewAlias}\n\n` +
          `Note: ${review.reviewRating}\n\n` +
          `Contenu: ${review.reviewContent}\n\n` +
          `Date de soumission: ${review.reviewPostedOn}\n\n` +
          `Validée: ${review.reviewApproved ? 'Oui' : 'Non'}\n\n` +
          `Validée par: ${review.approvedBy ? review.approvedBy : 'N/A'}`
      );
    } else {
      console.error('Avis non trouvé', reviewId);
    }
  }

  addReview(): void {
    // Code pour ajouter une review
  }

  editReview(reviewId: number): void {
    // Code pour éditer une review
  }

  deleteReview(reviewId: number): void {
    // Code pour supprimer une review
  }

  saveReview(review: Review): void {
    // Code pour enregistrer une review
  }
}
