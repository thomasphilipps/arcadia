import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Specie } from '@app/interfaces/specie.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { SpecieService } from '@app/services/specie.service';
import { SqlDataTableComponent } from '../templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '../templates/sql-form/sql-form.component';
import { Validators } from '@angular/forms';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

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
          type: 'input',
          maxLength: 32,
          validators: [Validators.required, Validators.maxLength(32)],
          placeholder: "Nom de l'espèce",
        },
        {
          label: 'Taxonomie',
          controlName: 'specieTaxon',
          type: 'input',
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
    this.specieService.getAllData().subscribe((data) => {
      this.species = data;
    });
  }

  getOptions() {
    this.specieService.getBiomeOptions().subscribe((biomes) => {
      const specieBiomeField = this.speciesConfig.formFields?.find(
        (field) => field.controlName === 'biomeKey'
      );
      if (specieBiomeField) {
        specieBiomeField.selectOptions = biomes;
      }
    });
  }

  addSpecie() {
    console.log('Adding specie');
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
    console.log('Editing specie with id: ', specieId);
    const editingSpecies = this.species.find((s) => s.specieId === specieId) || null;

    if (editingSpecies) {
      this.sqlFormComponent.editForm = true;
      this.sqlFormComponent.initializeForm(editingSpecies);
    }
  }

  deleteSpecie(specieId: number) {
    console.log('Deleting specie with id: ', specieId);
  }
}
