import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SqlDataTableComponent } from '../templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '../templates/sql-form/sql-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Animal } from '@app/interfaces/animal.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { AnimalService } from '@app/services/animal.service';

@Component({
  selector: 'arz-animal-admin',
  standalone: true,
  imports: [CommonModule, SqlDataTableComponent, SqlFormComponent, MatIconModule, MatButtonModule],
  templateUrl: './animal-admin.component.html',
  styleUrl: './animal-admin.component.scss',
})
export class AnimalAdminComponent implements OnInit {
  animals: Animal[] = [];
  animalsConfig: SqlViewDataConfig<Animal>;

  editingAnimalId: string | null = null;

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<Animal>;

  constructor(private animalService: AnimalService) {
    this.animalsConfig = {
      label: 'Animaux',
      data: this.animalService.getAllData(),
      primaryKey: 'animalId',
      displayColumns: [
        {
          key: 'animalName',
          label: 'Nom',
        },
        {
          key: 'animalGender',
          label: 'Sexe',
        },
        {
          key: 'animalBirth',
          label: 'Né le',
        },
        {
          key: 'animalBiome',
          label: 'Habitat',
        },
        {
          key: 'animalSpecie',
          label: 'Espèce',
        },
        {
          key: 'animalDescr',
          label: 'Description',
        },
      ],
      actions: { view: true, edit: true, delete: true },
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
