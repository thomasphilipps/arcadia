import { Component, OnInit, ViewChild } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';

import { Observable, catchError, of, tap } from 'rxjs';

import { SqlDataTableComponent } from '@app/components/templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '@app/components/templates/sql-form/sql-form.component';
import { Animal } from '@app/interfaces/animal.interface';
import { Feeding, defaultFeeding } from '@app/interfaces/feeding.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { User } from '@app/interfaces/user.interface';
import { AnimalService } from '@app/services/animal.service';
import { AuthService } from '@app/services/auth.service';
import { FeedingService } from '@app/services/feeding.service';
import { Validators } from '@angular/forms';
import { VetReport } from '@app/interfaces/report.interface';
import { toDate } from '@app/utils/utils';

@Component({
  selector: 'arz-feeding-admin',
  standalone: true,
  imports: [SqlDataTableComponent, SqlFormComponent, MatExpansionModule],
  templateUrl: './feeding-admin.component.html',
  styleUrl: './feeding-admin.component.scss',
})
export class FeedingAdminComponent implements OnInit {
  animals: Animal[] = [];
  feedings: Feeding[] = [];
  feedingsConfig: SqlViewDataConfig<Animal> = this.createAnimalConfig();
  feedingListConfig: SqlViewDataConfig<Feeding> = this.createFeedingConfig();
  feedingFormConfig: SqlViewDataConfig<Feeding> = this.createFeedingFormFConfig();
  lastReport: VetReport | null = null;
  currentUser: User | null = null;
  selectedAnimal: Animal | null = null;
  editingFeedingId: number | null = null;
  initialFormValues: Partial<Feeding> = {};
  showFeedingList = false;

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<Feeding>;

  constructor(
    private animalService: AnimalService,
    private feedingService: FeedingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAnimals();
    this.loadFeedings();
    this.currentUser = this.authService.currentUserValue;
  }

  loadAnimals(): void {
    this.animalService.loadData();
    this.animalService.getAllData().subscribe({
      next: (animals) => {
        this.animals = animals;
        this.updateAnimalConfig();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des animaux', error);
      },
    });
  }

  loadFeedings(): void {
    this.feedingService.loadData();
    this.feedingService.getAllData().subscribe({
      next: (feedings) => {
        this.feedings = feedings;
        this.updateAnimalConfig();
        if (this.selectedAnimal) {
          this.updateFeedingListConfig(this.selectedAnimal.animalId);
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des repas', error);
      },
    });
  }

  updateAnimalConfig(): void {
    const viewdata = this.animals.map((animal) => {
      const reports = this.getAnimalFeedings(animal.animalId);
      const lastReport = reports ? reports[0] : null;
      return {
        ...animal,
        lastFeedingDate: lastReport?.feedingDate,
        feederName: lastReport?.feederName,
      };
    });

    this.feedingsConfig = {
      ...this.feedingsConfig,
      data: of(viewdata),
    };
  }

  updateFeedingListConfig(animalId: string): void {
    const feedings = this.getAnimalFeedings(animalId) || [];
    const animal = this.animals.find((a) => a.animalId === animalId) || null;
    this.selectedAnimal = animal;
    this.feedingListConfig = {
      ...this.feedingListConfig,
      label: `Repas de ${animal?.animalName ?? 'Animal inconnu'}`,
      data: of(feedings),
    };
  }

  getAnimalFeedings(animalId: string): Feeding[] | null {
    const feedings = this.feedings
      .filter((feeding) => feeding.animalKey === animalId)
      .sort((a, b) => new Date(b.feedingDate).getTime() - new Date(a.feedingDate).getTime());
    return feedings.length ? feedings : null;
  }

  createFeedingConfig(): SqlViewDataConfig<Feeding> {
    return {
      label: '',
      data: of([]),
      primaryKey: 'feedingId',
      displayColumns: [
        { key: 'feedingDate', label: 'Date' },
        { key: 'feederName', label: 'Donné par' },
        { key: 'feedingType', label: 'Repas' },
        { key: 'feedingAmount', label: 'Quantité' },
      ],
      actions: {
        edit: (report) => this.currentUser?.userId === report.feedingBy,
        delete: (report) => this.currentUser?.userId === report.feedingBy,
      },
      sortable: false,
      noFilter: true,
    };
  }

  createAnimalConfig(): SqlViewDataConfig<Animal> {
    return {
      label: 'Animaux',
      data: of([]),
      primaryKey: 'animalId',
      displayColumns: [
        { key: 'animalName', label: 'Nom' },
        { key: 'animalSpecie', label: 'Espèce' },
        { key: 'animalBiome', label: 'Habitat' },
        { key: 'lastFeedingDate', label: 'Dernier repas' },
        { key: 'feederName', label: 'Donné par' },
      ],
      actions: { view: true, newSub: true },
    };
  }

  createFeedingFormFConfig(): SqlViewDataConfig<Feeding> {
    return {
      label: 'Ajouter un repas',
      data: of([]),
      primaryKey: 'feedingId',
      formFields: [
        {
          label: 'Nourriture donnée',
          controlName: 'feedingType',
          type: 'text',
          maxLength: 32,
          validators: [Validators.required, Validators.maxLength(32)],
          placeholder: 'Nourriture donnée',
        },
        {
          label: 'Quantité donnée',
          controlName: 'feedingAmount',
          type: 'text',
          maxLength: 32,
          validators: [Validators.required, Validators.maxLength(32)],
          placeholder: 'Quantité donnée',
        },
      ],
    };
  }

  addFeeding(animalId: string): void {
    this.getLastReport(animalId).subscribe({
      next: () => {
        const newFeeding: Partial<Feeding> = {
          ...defaultFeeding,
          reportKey: this.lastReport?.reportId ?? 0,
          animalKey: animalId,
          feedingBy: this.currentUser?.userId ?? '',
        };

        const name = this.getAnimalName(animalId);
        this.editingFeedingId = null;
        this.sqlFormComponent.formTitle = `Ajouter un repas pour ${name}`;
        this.sqlFormComponent.editForm = true;
        this.initialFormValues = newFeeding;
        this.sqlFormComponent.initializeForm(newFeeding as Feeding);
      },
    });
  }

  viewFeedings(animalId: string): void {
    this.showFeedingList = true;
    this.updateFeedingListConfig(animalId);
  }

  editFeeding(feedingId: number): void {
    const feeding = this.feedings.find((f) => f.feedingId === feedingId);
    if (!feeding) {
      console.error('Feeding not found', feedingId);
      return;
    }

    this.getLastReport(feeding.animalKey);
    const feedingDate = toDate(feeding.feedingDate).toLocaleDateString();
    this.sqlFormComponent.formTitle = `Modifier le repas du ${feedingDate} pour ${feeding.animalName}`;
    this.editingFeedingId = feedingId;
    this.sqlFormComponent.editForm = true;
    this.initialFormValues = feeding;
    this.sqlFormComponent.initializeForm(feeding);
  }

  deleteFeeding(feedingId: number): void {
    const feeding = this.feedings.find((f) => f.feedingId === feedingId);
    if (!feeding) {
      console.error('Erreur lors de la suppression du repas: repas introuvable');
      return;
    }
    const feedingDate = toDate(feeding.feedingDate).toLocaleDateString();
    const message =
      `Voulez-vous vraiment supprimer le repas du ${feedingDate} pour ${feeding.animalName} ?` +
      `\n\nCette action est irréversible ! \n\n` +
      `Cliquez sur "OK" pour confirmer ou "Annuler" pour annuler l'opération\n\n`;

    if (confirm(message)) {
      this.feedingService
        .deleteData(feedingId)

        .subscribe({
          next: () => {
            alert('Repas supprimé');
            this.loadFeedings();
            this.loadAnimals();
            if (this.selectedAnimal) {
              this.updateFeedingListConfig(this.selectedAnimal.animalId);
            }
          },
          error: (error) => {
            console.error('Erreur lors de la suppression du repas', error);
          },
        });
    }
  }

  saveFeeding(feeding: Feeding): void {
    const mergedFeeding = { ...this.initialFormValues, ...feeding };

    const operation =
      this.editingFeedingId === null
        ? this.feedingService.createData(mergedFeeding)
        : this.feedingService.updateData(
            this.editingFeedingId,
            this.getChangedFields(mergedFeeding)
          );

    operation
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la sauvegarde du repas', error);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          alert('Repas sauvegardé');
          this.loadAnimals();
          this.loadFeedings();
        },
        complete: () => {
          this.editingFeedingId = null;
          this.sqlFormComponent.onCancelEdit();
          if (this.selectedAnimal) {
            this.updateFeedingListConfig(this.selectedAnimal.animalId);
          }
        },
      });
  }

  getChangedFields(feeding: Feeding): Partial<Feeding> {
    const changedFields: any = {};
    (Object.keys(feeding) as (keyof Feeding)[]).forEach((key) => {
      if (feeding[key] !== this.initialFormValues[key]) {
        changedFields[key] = feeding[key];
      }
    });
    return changedFields;
  }

  getAnimalName(animalId: string): string {
    const animal = this.animals.find((a) => a.animalId === animalId);
    return animal?.animalName ?? 'Animal inconnu';
  }

  getLastReport(animalId: string): Observable<VetReport | null> {
    return this.feedingService.getLastFeedingRecommendation(animalId).pipe(
      tap((recommendation) => {
        this.lastReport = recommendation[0];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des repas', error);
        return of(null); // ou gérer l'erreur de manière appropriée
      })
    );
  }
}
