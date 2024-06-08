import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';

import { catchError, of } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Biome } from '@app/interfaces/biome.interface';
import { BiomeService } from '@app/services/biome.service';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { SqlDataTableComponent } from '@templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '@templates/sql-form/sql-form.component';
import { CustomValidators } from '@app/validators/custom.validators';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'arz-biome-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule, SqlDataTableComponent, SqlFormComponent, MatButtonModule],
  templateUrl: './biome-admin.component.html',
  styleUrl: './biome-admin.component.scss',
})
export class BiomeAdminComponent implements OnInit {
  biomes: Biome[] = [];
  biomeConfig: SqlViewDataConfig<Biome>;

  editingBiome: Biome | null = null;
  editingBiomeId: number | null = null;

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<Biome>;

  constructor(private biomeService: BiomeService, private authService: AuthService) {
    this.biomeConfig = {
      label: 'Habitats',
      data: this.biomeService.getAllData(),
      primaryKey: 'biomeId',
      displayColumns: [
        {
          key: 'biomeName',
          label: 'Nom',
        },
        {
          key: 'biomeShortDescr',
          label: 'Description courte',
        },
        {
          key: 'biomeLongDescr',
          label: 'Description longue',
        },
        {
          key: 'biomeStatus',
          label: 'Etat',
        },
      ],
      actions: { view: true, edit: true, delete: true },
      formFields: [
        {
          label: 'Nom',
          controlName: 'biomeName',
          type: 'text',
          maxLength: 32,
          validators: [
            Validators.required,
            Validators.maxLength(32),
            CustomValidators.nameFormat(),
          ],
          placeholder: "Nom de l'habitat",
        },
        {
          label: 'Description abrégée',
          controlName: 'biomeShortDescr',
          type: 'textarea',
          maxLength: 255,
          minRows: 3,
          maxRows: 10,
          validators: [Validators.required, Validators.maxLength(255)],
          placeholder: "Description courte de l'habitat",
        },
        {
          label: 'Description complète',
          controlName: 'biomeLongDescr',
          type: 'textarea',
          maxLength: 1000,
          minRows: 5,
          maxRows: 25,
          validators: [Validators.required, Validators.maxLength(1000)],
          placeholder: "Description complète de l'habitat",
        },
        {
          label: 'Etat',
          controlName: 'biomeStatus',
          type: 'textarea',
          maxLength: 1000,
          minRows: 5,
          maxRows: 25,
          validators: [Validators.maxLength(1000)],
        },
      ],
    };
  }

  get isAdmin(): boolean {
    return this.authService.hasRole(['ROLE_ADMIN']);
  }

  ngOnInit(): void {
    this.loadBiomes();
  }

  loadBiomes(): void {
    this.biomeService.loadData();
    this.biomeService.getAllData().subscribe({
      next: (biomes) => {
        this.biomes = biomes;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des habitats: ', error);
      },
    });
  }

  addBiome(): void {
    this.editingBiomeId = null;
    this.sqlFormComponent.editForm = true;
    this.sqlFormComponent.initializeForm(null);
  }

  viewBiome(biomeId: number): void {
    const biome = this.biomes.find((biome) => biome.biomeId === biomeId);
    if (biome) {
      alert(
        `Nom de l'habitat: ${biome.biomeName}\n\nDescription courte: ${biome.biomeShortDescr}\n\n` +
          `Description longue: ${biome.biomeLongDescr}\n\n` +
          `Etat: ${biome.biomeStatus} `
      );
    }
  }

  editBiome(biomeId: number): void {
    const editingBiomes = this.biomes.find((b) => b.biomeId === biomeId) || null;
    if (editingBiomes) {
      this.editingBiomeId = biomeId;
      this.sqlFormComponent.editForm = true;
      this.sqlFormComponent.initializeForm(editingBiomes);
    }
  }

  deleteBiome(biomeId: number): void {
    const biomeName = this.biomes.find((biome) => biome.biomeId === biomeId)?.biomeName ?? '';
    const message =
      `Voulez-vous vraiment supprimer l'habitat' "${biomeName}" ?` +
      `\n\nCette action est irréversible !\n\n` +
      `Cliquez sur "OK" pour confirmer ou "Annuler" pour annuler l'opération\n\n`;

    if (confirm(message)) {
      this.biomeService
        .deleteData(biomeId)
        .pipe(
          catchError((error) => {
            console.error("Erreur lors de la suppression de l'habitat: ", error);
            return of(null);
          })
        )
        .subscribe({
          next: () => {
            alert('Habitat supprimée avec succès');
          },
          complete: () => {
            this.editingBiome = null;
            this.sqlFormComponent.onCancelEdit();
          },
        });
    }
  }

  saveBiome(data: Biome) {
    const operation =
      this.editingBiomeId === null
        ? this.biomeService.createData(data)
        : this.biomeService.updateData(this.editingBiomeId, data);

    operation
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'enregistrement de l'habitat: ", error);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          alert('Espèce enregistrée avec succès');
        },
        complete: () => {
          this.editingBiomeId = null;
          this.editingBiome = null;
          this.sqlFormComponent.onCancelEdit();
        },
      });
  }
}
