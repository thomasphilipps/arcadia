import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';

import { catchError, of } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Specie } from '@app/interfaces/specie.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { SpecieService } from '@app/services/specie.service';
import { SqlDataTableComponent } from '../templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '../templates/sql-form/sql-form.component';

@Component({
  selector: 'arz-specie-admin',
  standalone: true,
  imports: [CommonModule, SqlDataTableComponent, SqlFormComponent, MatIconModule, MatButtonModule],
  templateUrl: './specie-admin.component.html',
  styleUrl: './specie-admin.component.scss',
})
export class SpecieAdminComponent implements OnInit {
  species: Specie[] = [];
  speciesConfig: SqlViewDataConfig<Specie>;

  editingSpecie: Specie | null = null;
  editingSpecieId: number | null = null;

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<Specie>;

  constructor(private specieService: SpecieService) {
    this.speciesConfig = {
      label: 'Espèces',
      data: this.specieService.getAllData(),
      primaryKey: 'specieId',
      displayColumns: [
        {
          key: 'specieName',
          label: 'Nom',
        },
        {
          key: 'specieTaxon',
          label: 'Taxonomie',
        },
        {
          key: 'specieDescr',
          label: 'Description',
        },
        {
          key: 'specieBiome',
          label: 'Habitat',
        },
      ],
      actions: { view: true, edit: true, delete: true },
      formFields: [
        {
          label: 'Nom',
          controlName: 'specieName',
          type: 'text',
          maxLength: 32,
          validators: [Validators.required, Validators.maxLength(32)],
          placeholder: "Nom de l'espèce",
        },
        {
          label: 'Taxonomie',
          controlName: 'specieTaxon',
          type: 'text',
          maxLength: 32,
          validators: [Validators.required, Validators.maxLength(32)],
          placeholder: "Taxonomie de l'espèce",
        },
        {
          label: 'Description',
          controlName: 'specieDescr',
          type: 'textarea',
          maxLength: 1000,
          minRows: 5,
          maxRows: 25,
          validators: [Validators.required, Validators.maxLength(1000)],
          placeholder: "Description de l'espèce",
        },
        {
          label: 'Habitat',
          controlName: 'biomeKey',
          type: 'select',
          validators: [Validators.required],
          placeholder: "Habitat de l'espèce",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.loadSpecies();
    this.getOptions();
  }

  loadSpecies() {
    this.specieService.loadData();
    this.specieService.getAllData().subscribe({
      next: (species) => {
        this.species = species;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données: ', error);
      },
    });
  }

  getOptions() {
    this.specieService
      .getBiomeOptions()
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération des habitats: ', error);
          return of(null);
        })
      )
      .subscribe((biomes) => {
        const specieBiomeField = this.speciesConfig.formFields?.find(
          (field) => field.controlName === 'biomeKey'
        );
        if (specieBiomeField) {
          specieBiomeField.selectOptions = biomes || [];
        }
      });
  }

  saveSpecie(data: Specie) {
    const operation =
      this.editingSpecieId === null
        ? this.specieService.createData(data)
        : this.specieService.updateData(this.editingSpecieId, data);

    operation
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'enregistrement de l'espèce: ", error);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          alert('Espèce enregistrée avec succès');
        },
        complete: () => {
          this.editingSpecieId = null;
          this.editingSpecie = null;
          this.sqlFormComponent.onCancelEdit();
        },
      });
  }

  addSpecie() {
    this.editingSpecieId = null;
    this.sqlFormComponent.editForm = true;
    this.sqlFormComponent.initializeForm(null);
  }

  viewSpecie(specieId: number) {
    const specie = this.species.find((specie) => specie.specieId === specieId);
    if (specie) {
      alert(
        `Nom: ${specie.specieName}\n\nTaxonomie: ${specie.specieTaxon}\n\n` +
          `Description: ${specie.specieDescr}\n\nHabitat: ${specie.specieBiome}`
      );
    }
  }

  editSpecie(specieId: number) {
    const editingSpecies = this.species.find((s) => s.specieId === specieId) || null;

    if (editingSpecies) {
      this.editingSpecieId = specieId;
      this.sqlFormComponent.editForm = true;
      this.sqlFormComponent.initializeForm(editingSpecies);
    }
  }

  deleteSpecie(specieId: number) {
    const specieName =
      this.species.find((specie) => specie.specieId === specieId)?.specieName || '';
    const message =
      `Voulez-vous vraiment supprimer l'espèce : "${specieName}" ?` +
      `\n\nCette action est irréversible !\n\n` +
      `Cliquez sur "OK" pour confirmer ou "Annuler" pour annuler l'opération\n\n`;

    if (confirm(message)) {
      this.specieService
        .deleteData(specieId)
        .pipe(
          catchError((error) => {
            console.error("Erreur lors de la suppression de l'espèce: ", error);
            return of(null);
          })
        )
        .subscribe({
          next: () => {
            alert('Espèce supprimée avec succès');
          },
          complete: () => {
            this.editingSpecie = null;
            this.sqlFormComponent.onCancelEdit();
          },
        });
    }
  }
}
