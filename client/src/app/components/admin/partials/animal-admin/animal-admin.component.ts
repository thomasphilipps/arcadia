import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SqlDataTableComponent } from '../templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '../templates/sql-form/sql-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Animal } from '@app/interfaces/animal.interface';
import { OptionArray, SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { AnimalService } from '@app/services/animal.service';
import { Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'arz-animal-admin',
  standalone: true,
  imports: [CommonModule, SqlDataTableComponent, SqlFormComponent, MatIconModule, MatButtonModule],
  templateUrl: './animal-admin.component.html',
  styleUrls: ['./animal-admin.component.scss'],
})
export class AnimalAdminComponent implements OnInit {
  animals: Animal[] = [];
  animalsConfig: SqlViewDataConfig<Animal>;
  speciesOptions: OptionArray[] = [];

  editingAnimalId: string | null = null;

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<Animal>;

  constructor(private animalService: AnimalService) {
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
        { key: 'animalDescr', label: 'Description' },
      ],
      actions: { view: true, edit: true, delete: true },
      formFields: [
        {
          label: 'Nom',
          controlName: 'animalName',
          type: 'text',
          maxLength: 32,
          validators: [Validators.required, Validators.maxLength(32)],
          placeholder: "Nom de l'animal",
        },
        {
          label: 'Sexe',
          controlName: 'animalGender',
          type: 'radio',
          radioOptions: [
            { idValue: 'Mâle', label: 'Mâle' },
            { idValue: 'Femelle', label: 'Femelle' },
          ],
          validators: [Validators.required],
          placeholder: 'Mâle ou Femelle',
        },
        {
          label: 'Né le',
          controlName: 'animalBirth',
          type: 'date',
          validators: [Validators.required],
          placeholder: "Date de naissance de l'animal",
        },
        {
          label: 'Habitat',
          controlName: 'biomeKey',
          type: 'select',
          validators: [Validators.required],
          placeholder: "Habitat de l'animal",
        },
        {
          label: 'Espèce',
          controlName: 'specieKey',
          type: 'select',
          selectOptions: [],
          validators: [Validators.required],
          placeholder: "Espèce de l'animal",
        },
        {
          label: 'Description',
          controlName: 'animalDescr',
          type: 'textarea',
          maxLength: 255,
          minRows: 3,
          maxRows: 10,
          validators: [Validators.required, Validators.maxLength(255)],
        },
      ],
    };
  }

  ngOnInit(): void {
    this.loadAnimals();
    this.getBiomeOptions();
  }

  saveAnimal(animal: Animal): void {
    console.log("Sauvegarde de l'animal:", animal);
  }

  viewAnimal(animalId: string): void {
    const animal = this.animals.find((a) => a.animalId === animalId);
    if (animal) {
      console.log('Voir animal:', animal);
    }
  }

  addAnimal() {
    this.editingAnimalId = null;
    this.sqlFormComponent.editForm = true;
    this.sqlFormComponent.initializeForm(null);
  }

  editAnimal(animalId: string): void {}

  deleteAnimal(animalId: string): void {}

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

  getBiomeOptions() {
    this.animalService
      .getBiomeOptions()
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération des habitats: ', error);
          return of(null);
        })
      )
      .subscribe((biomes) => {
        const animalBiomeField = this.animalsConfig.formFields?.find(
          (field) => field.controlName === 'biomeKey'
        );
        if (animalBiomeField) {
          animalBiomeField.selectOptions = biomes || [];
        }
      });
  }

  getSpecieByBiomeId(biomeId: number) {
    this.animalService
      .getSpecieByBiomeId(biomeId)
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération des espèces: ', error);
          return of(null);
        })
      )
      .subscribe((species) => {
        const animalSpecieField = this.animalsConfig.formFields?.find(
          (field) => field.controlName === 'specieKey'
        );
        if (animalSpecieField) {
          animalSpecieField.selectOptions = species || [];
        }
        this.speciesOptions = species || [];
      });
  }
}
