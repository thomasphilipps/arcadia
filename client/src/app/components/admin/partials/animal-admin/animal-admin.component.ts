import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';

import { catchError, of } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SqlDataTableComponent } from '@templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '@templates/sql-form/sql-form.component';
import { Animal } from '@app/interfaces/animal.interface';
import { OptionArray, SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { AnimalService } from '@app/services/animal.service';
import { convertIsoDateToLocaleDate, toDate } from '@app/utils/utils';
import { CustomValidators } from '@app/validators/custom.validators';

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
  initialFormValues: Partial<Animal> = {};

  convertDate = convertIsoDateToLocaleDate;
  toDate = toDate;

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
          label: 'Nom',
          controlName: 'animalName',
          type: 'text',
          maxLength: 32,
          validators: [
            Validators.required,
            Validators.maxLength(32),
            CustomValidators.nameFormat(),
          ],
          placeholder: "Nom de l'animal",
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
      ],
      sortable: true,
    };
  }

  ngOnInit(): void {
    this.loadAnimals();
    this.getBiomeOptions();
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

  addAnimal() {
    this.editingAnimalId = null;
    this.sqlFormComponent.editForm = true;
    this.sqlFormComponent.initializeForm(null);
  }

  viewAnimal(animalId: string): void {
    const animal = this.animals.find((a) => a.animalId === animalId);
    if (animal) {
      const birthDateString =
        animal.animalBirth instanceof Date ? animal.animalBirth.toISOString() : animal.animalBirth;
      alert(
        `Nom de l'animal: ${animal.animalName}\n` +
          `Sexe: ${animal.animalGender}\n` +
          `Né le: ${this.convertDate(birthDateString)}\n` +
          `Habitat: ${animal.animalBiome}\n` +
          `Espèce: ${animal.animalSpecie}\n` +
          `Description: ${animal.animalDescr}`
      );
    }
  }

  editAnimal(animalId: string): void {
    const animal = this.animals.find((a) => a.animalId === animalId) || null;
    if (animal) {
      this.editingAnimalId = animalId;
      this.sqlFormComponent.editForm = true;
      this.sqlFormComponent.initializeForm(animal);
      this.initialFormValues = this.sqlFormComponent.form.value;
    }
  }

  deleteAnimal(animalId: string): void {
    const animalName = this.animals.find((a) => a.animalId === animalId)?.animalName || '';
    const message =
      `Voulez-vous vraiment supprimer l'animal "${animalName}" ?` +
      `\n\nCette action est irréversible !\n\n` +
      `Cliquez sur "OK" pour confirmer ou "Annuler" pour annuler l'opération\n\n`;

    if (confirm(message)) {
      this.animalService
        .deleteData(animalId)
        .pipe(
          catchError((error) => {
            console.error("Erreur lors de la suppression de l'animal:", error);
            return of(null);
          })
        )
        .subscribe({
          next: () => {
            alert('Animal supprimé avec succès');
          },
          complete: () => {
            this.editingAnimalId = null;
            this.sqlFormComponent.onCancelEdit();
          },
        });
    }
  }

  saveAnimal(animal: Animal): void {
    const operation =
      this.editingAnimalId === null
        ? this.animalService.createData(animal)
        : this.animalService.updateData(this.editingAnimalId, this.getChangedFields(animal));

    operation
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de la sauvegarde de l'animal:", error);
          return of(null);
        })
      )
      .subscribe({
        next: (result) => {
          alert('Animal sauvegardé avec succès');
        },
        complete: () => {
          this.editingAnimalId = null;
          this.sqlFormComponent.onCancelEdit();
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

  // TODO: Move this method to a shared service
  getChangedFields(animal: Animal): Partial<Animal> {
    const changedFields: any = {};
    (Object.keys(animal) as (keyof Animal)[]).forEach((key) => {
      if (animal[key] !== this.initialFormValues[key]) {
        changedFields[key] = animal[key] as Animal[keyof Animal];
      }
    });
    return changedFields;
  }
}
