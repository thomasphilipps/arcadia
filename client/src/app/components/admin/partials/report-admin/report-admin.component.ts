import { Component, OnInit } from '@angular/core';
import { SqlDataTableComponent } from '@app/components/templates/sql-data-table/sql-data-table.component';
import { Animal } from '@app/interfaces/animal.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { AnimalService } from '@app/services/animal.service';
import { ReportService } from '@app/services/report.service';

@Component({
  selector: 'arz-report-admin',
  standalone: true,
  imports: [SqlDataTableComponent],
  templateUrl: './report-admin.component.html',
  styleUrl: './report-admin.component.scss',
})
export class ReportAdminComponent implements OnInit {
  animals: Animal[] = [];
  animalsConfig: SqlViewDataConfig<Animal>;

  editingAnimalId: string | null = null;

  constructor(private animalService: AnimalService, private reprtService: ReportService) {
    this.animalsConfig = {
      label: 'Animaux',
      data: this.animalService.getAllData(),
      primaryKey: 'animalId',
      displayColumns: [
        { key: 'animalName', label: 'Nom' },
        { key: 'animalGender', label: 'Sexe' },
        { key: 'animalBirth', label: 'Né le' },
        { key: 'animalBiome', label: 'Habitat' },
        { key: 'animalSpecie', label: 'Espèce' },
      ],
      actions: { newSub: true },
      sortable: true,
    };
  }

  ngOnInit(): void {
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.animalService.loadData();
    this.animalService.getAllData().subscribe({
      next: (animals) => {
        this.animals = animals;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données: ', error);
      },
    });
  }
}
