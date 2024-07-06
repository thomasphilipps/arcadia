import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Biome } from '@app/interfaces/biome.interface';
import { Specie } from '@app/interfaces/specie.interface';
import { BiomeService } from '@app/services/biome.service';
import { DataService } from '@app/services/data.service';
import { SpecieService } from '@app/services/specie.service';

@Component({
  selector: 'arz-biome-client',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './biome-client.component.html',
  styleUrl: './biome-client.component.scss',
})
export class BiomeClientComponent implements OnInit {
  biomes: Biome[];

  constructor(
    private dataService: DataService,
    private biomeService: BiomeService,
    private specieService: SpecieService
  ) {}

  ngOnInit(): void {
    this.loadElements();
  }

  loadElements(): void {
    this.dataService.loadData(this.biomeService).subscribe({
      next: (data) => {
        this.biomes = data;
        this.dataService.loadImages('Biome', this.biomes, 'biomeId');
        this.loadSpeciesForBiomes();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des biomes:', error);
      },
    });
  }

  loadSpeciesForBiomes(): void {
    this.biomes.forEach((biome) => {
      this.biomeService.getSpeciesByBiomeId(biome.biomeId).subscribe({
        next: (species) => {
          this.loadAnimalsForSpecies(species);
          biome.species = species;
        },
        error: (error) => {
          console.error(
            `Erreur lors du chargement des espèces pour le biome ${biome.biomeId}:`,
            error
          );
        },
      });
    });
  }

  loadAnimalsForSpecies(species: Specie[]): void {
    species.forEach((specie) => {
      this.specieService.getAnimalsBySpecieId(specie.specieId).subscribe({
        next: (animals) => {
          specie.animals = animals;
        },
        error: (error) => {
          console.error(
            `Erreur lors du chargement des animaux pour l'espèce ${specie.specieId}:`,
            error
          );
        },
      });
    });
  }
}
