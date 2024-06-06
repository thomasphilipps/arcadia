import { Component, OnInit, ViewChild } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';

import { SqlDataTableComponent } from '@app/components/templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '@app/components/templates/sql-form/sql-form.component';
import { Animal } from '@app/interfaces/animal.interface';
import { Feeding } from '@app/interfaces/feeding.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { User } from '@app/interfaces/user.interface';
import { AnimalService } from '@app/services/animal.service';
import { AuthService } from '@app/services/auth.service';
import { FeedingService } from '@app/services/feeding.service';
import { of } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

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
  currentUser: User | null = null;
  selectedAnimal: Animal | null = null;
  editingFeedingId: number | null = null;
  initialFormValues: Partial<Feeding> = {};

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
        { key: 'feedingBy', label: 'Employé' },
        { key: 'feedingType', label: 'Repas' },
        { key: 'feedingAmount', label: 'Quantité' },
      ],
      actions: {
        view: true,
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
        { key: 'feederName', label: 'Employé' },
      ],
      actions: { view: true, newSub: true },
    };
  }

  addFeeding(animalId: string): void {
    console.log('addFeeding', animalId);
  }

  viewFeedings(animalId: string): void {
    console.log('viewFeedings', animalId);
  }
}
