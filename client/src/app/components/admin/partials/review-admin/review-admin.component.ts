import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';

import { catchError, of } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Review } from '@app/interfaces/review.interface';
import { ReviewService } from '@app/services/review.service';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { SqlDataTableComponent } from '@templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '@templates/sql-form/sql-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '@app/services/auth.service';
import { toDate } from '@app/utils/utils';

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
  reviews: Review[] = [];
  reviewConfigApproved: SqlViewDataConfig<Review>;
  reviewConfigUnapproved: SqlViewDataConfig<Review>;
  reviewConfig: SqlViewDataConfig<Review>;

  editingReview: Review | null = null;
  editingReviewId: number | null = null;
  initialFormValues: Partial<Review> = {};

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<Review>;

  constructor(private reviewService: ReviewService, private authService: AuthService) {
    this.reviewConfigUnapproved = this.createReviewConfig(
      'Avis Non Approuvés',
      this.reviewService.getUnapprovedReviews()
    );

    this.reviewConfigApproved = this.createReviewConfig(
      'Avis Approuvés',
      this.reviewService.getApprovedReviews(),
      {
        displayColumns: [
          ...this.reviewConfigUnapproved.displayColumns!,
          { key: 'approvedBy', label: 'Validée par' },
        ],
      }
    );

    this.reviewConfig = { ...this.reviewConfigUnapproved };
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
      error: (error) => {
        console.error('Erreur lors du chargement des avis: ', error);
      },
    });
  }

  addReview(): void {
    const newReview: Partial<Review> = {
      reviewPostedOn: toDate(new Date()), // Initialisation de reviewPostedOn à la date du jour
      reviewApproved: true,
    };

    this.editingReviewId = null;
    this.sqlFormComponent.editForm = true;
    this.sqlFormComponent.formTitle = 'Ajouter un avis';
    this.sqlFormComponent.initializeForm(newReview as Review); // Passer les valeurs initiales au formulaire
  }

  viewReview(reviewId: number): void {
    const review = this.reviews.find((review) => review.reviewId === reviewId);
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

  editReview(reviewId: number): void {
    const editingReview = this.reviews.find((r) => r.reviewId === reviewId) || null;
    if (editingReview) {
      this.editingReviewId = reviewId;
      this.sqlFormComponent.editForm = true;
      this.sqlFormComponent.formTitle = `Modifier l'avis de ${editingReview.reviewAlias}`;
      this.sqlFormComponent.initializeForm(editingReview);
      this.initialFormValues = this.sqlFormComponent.form.value;
    }
  }

  deleteReview(reviewId: number): void {
    const reviewAlias =
      this.reviews.find((review) => review.reviewId === reviewId)?.reviewAlias ?? '';
    const message =
      `Voulez-vous vraiment supprimer l'avis de "${reviewAlias}" ?` +
      `\n\nCette action est irréversible !\n\n` +
      `Cliquez sur "OK" pour confirmer ou "Annuler" pour annuler l'opération\n\n`;

    if (confirm(message)) {
      this.reviewService
        .deleteData(reviewId)
        .pipe(
          catchError((error) => {
            console.error("Erreur lors de la suppression de l'avis: ", error);
            return of(null);
          })
        )
        .subscribe({
          next: () => {
            alert('Avis supprimé avec succès');
            this.loadReviews(); // Reload reviews after deletion
          },
          complete: () => {
            this.editingReview = null;
            this.sqlFormComponent.onCancelEdit();
          },
        });
    }
  }

  saveReview(review: Review) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      review.reviewApprovedBy = currentUser.userId;
    }

    review.reviewRating = +review.reviewRating; // Convertir la note en nombre

    const operation =
      this.editingReviewId === null
        ? this.reviewService.createData(review)
        : this.reviewService.updateData(this.editingReviewId, this.getChangedFields(review));

    operation
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'enregistrement de l'avis: ", error);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          alert('Avis enregistré avec succès');
          this.loadReviews(); // Reload reviews after saving
        },
        complete: () => {
          this.editingReviewId = null;
          this.editingReview = null;
          this.sqlFormComponent.onCancelEdit();
        },
      });
  }

  getChangedFields(review: Review): Partial<Review> {
    const changedFields: any = {};
    (Object.keys(review) as (keyof Review)[]).forEach((key) => {
      if (review[key] !== this.initialFormValues[key]) {
        changedFields[key] = review[key];
      }
    });
    return changedFields;
  }

  private createReviewConfig(
    label: string,
    data: any,
    options?: Partial<SqlViewDataConfig<Review>>
  ): SqlViewDataConfig<Review> {
    const defaultConfig: SqlViewDataConfig<Review> = {
      label,
      data,
      primaryKey: 'reviewId',
      booleanColumns: ['reviewApproved'],
      displayColumns: [
        { key: 'reviewAlias', label: "Nom de l'auteur" },
        { key: 'reviewRating', label: 'Note' },
        { key: 'reviewContent', label: 'Contenu' },
        { key: 'reviewPostedOn', label: 'Date de soumission' },
      ],
      actions: { view: true, edit: true, delete: true },
      formFields: [
        {
          label: 'Publication approuvée',
          controlName: 'reviewApproved',
          type: 'checkbox',
        },
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
          label: "Nom de l'auteur",
          controlName: 'reviewAlias',
          type: 'text',
          maxLength: 32,
          validators: [Validators.required, Validators.maxLength(32)],
          placeholder: "Nom de l'auteur",
        },

        {
          label: 'Contenu',
          controlName: 'reviewContent',
          type: 'textarea',
          maxLength: 1000,
          minRows: 3,
          maxRows: 10,
          validators: [Validators.required, Validators.maxLength(1000)],
          placeholder: "Contenu de l'avis",
        },
      ],
      noFilter: true,
      sortable: true,
    };
    return { ...defaultConfig, ...options };
  }
}
