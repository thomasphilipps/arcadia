import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

import { catchError, of, take } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { Biome } from '@app/interfaces/biome.interface';
import { BiomeService } from '@app/services/biome.service';
import { truncate, getFormValidationErrors } from '@app/utils/utils';
import { MyErrorStateMatcher } from '@app/utils/errorState';

@Component({
  selector: 'arz-biome-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TextFieldModule,
    CdkTextareaAutosize,
  ],
  templateUrl: './biome-admin.component.html',
  styleUrl: './biome-admin.component.scss',
})
export class BiomeAdminComponent implements OnInit {
  biomes: Biome[] = [];
  editingBiome: Biome | null = null;
  editingBiomeId: number | null = null;
  biomeForm: FormGroup;

  truncate = truncate;

  matcher = new MyErrorStateMatcher();

  displayedColumns: string[] = ['biomeName', 'biomeShortDescr', 'biomeLongDescr', 'action'];

  constructor(private fb: FormBuilder, private biomeService: BiomeService) {
    this.biomeForm = this.fb.group({
      biomeName: ['', [Validators.required, Validators.maxLength(32)]],
      biomeShortDescr: ['', [Validators.required, Validators.maxLength(255)]],
      biomeLongDescr: ['', [Validators.required, Validators.maxLength(1000)]],
      biomeStatus: ['', [Validators.maxLength(1000)]],
    });
  }

  ngOnInit(): void {
    this.biomeService
      .getAllBiomes()
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération des biomes: ', error);
          return of([]);
        })
      )
      .subscribe((data) => {
        this.biomes = data;
      });
  }

  addBiome(): void {
    this.editingBiome = {
      biomeId: 0,
      biomeName: '',
      biomeShortDescr: '',
      biomeLongDescr: '',
      biomeStatus: '',
    };
  }

  viewBiome(biomeId: number): void {
    const biome = this.biomes.find((biome) => biome.biomeId === biomeId);
    if (biome) {
      alert(
        `Nom du biome: ${biome.biomeName}\n\nDescription courte: ${biome.biomeShortDescr}\n\n` +
          `Description longue: ${biome.biomeLongDescr}\n\n` +
          `Etat: ${biome.biomeStatus} `
      );
    }
  }

  editBiome(biomeId: number): void {
    this.editingBiomeId = biomeId;
    this.editingBiome = this.biomes.find((biome) => biome.biomeId === biomeId) || null;
    if (this.editingBiome) {
      this.biomeForm.patchValue(
        {
          biomeName: this.editingBiome.biomeName,
          biomeShortDescr: this.editingBiome.biomeShortDescr,
          biomeLongDescr: this.editingBiome.biomeLongDescr,
          biomeStatus: this.editingBiome.biomeStatus,
        },
        { emitEvent: false }
      );
    }
  }

  deleteBiome(biomeId: number): void {
    const biomeName = this.biomes.find((biome) => biome.biomeId === biomeId)?.biomeName || '';
    const message =
      `Voulez-vous vraiment supprimer le biome "${biomeName}" ?` +
      `\n\nCette action est irréversible !\n\n` +
      `Cliquez sur "OK" pour confirmer ou "Annuler" pour annuler l'opération\n\n`;

    if (confirm(message)) {
      this.biomeService
        .deleteBiome(biomeId)
        .pipe(
          catchError((error) => {
            console.error('Erreur lors de la suppression du biome: ', error);
            return of(null);
          })
        )
        .subscribe({
          next: (result) => {
            alert('Biome supprimé avec succès');
            this.biomes = this.biomes.filter((biome) => biome.biomeId !== biomeId);
          },
          complete: () => {
            this.editingBiome = null;
            this.biomeForm.reset();
          },
        });
    }
  }

  onSaveBiome(biomeId: number | null): void {
    const group: FormGroup = this.biomeForm;
    let data: Biome | null = this.editingBiome;

    if (group.invalid) {
      const errors = getFormValidationErrors(group);
      console.error(`Erreur lors de la validation du formulaire: ${errors.join(', ')}`);
      return;
    }

    if (data) {
      data.biomeName = group.get('biomeName')?.value;
      data.biomeShortDescr = group.get('biomeShortDescr')?.value;
      data.biomeLongDescr = group.get('biomeLongDescr')?.value;
      data.biomeStatus = group.get('biomeStatus')?.value;
    }

    if (biomeId && data) {
      this.biomeService
        .updateBiome(biomeId, data)
        .pipe(
          catchError((error) => {
            console.error('Erreur lors de la mise à jour du biome: ', error);
            return of(null);
          })
        )
        .subscribe({
          next: (result) => {
            alert('Biome mis à jour avec succès');
          },
          complete: () => {
            this.editingBiome = null;
            this.biomeForm.reset();
          },
        });
    } else {
      if (data) {
        this.biomeService
          .createBiome(data)
          .pipe(
            catchError((error) => {
              console.error("Erreur lors de l'ajout du biome: ", error);
              return of(null);
            })
          )
          .subscribe({
            next: (result) => {
              alert('Biome ajouté avec succès');
              result ? (this.biomes = [...this.biomes, result]) : null;
            },
            complete: () => {
              this.editingBiome = null;
              this.biomeForm.reset();
            },
          });
      }
    }
  }

  onCancelEdit(): void {
    this.biomeForm.reset();
    this.editingBiome = null;
  }
}
