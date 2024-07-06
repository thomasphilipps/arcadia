import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Biome } from '@app/interfaces/biome.interface';
import { Service } from '@app/interfaces/service.interface';
import { BiomeService } from '@app/services/biome.service';
import { DataService } from '@app/services/data.service';
import { ServiceService } from '@app/services/service.service';
import { ReviewClientComponent } from '../review-client/review-client.component';

@Component({
  selector: 'arz-home-client',
  standalone: true,
  imports: [ReviewClientComponent, MatCardModule, MatButtonModule, RouterLink, MatTooltipModule],
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss'],
})
export class HomeClientComponent implements OnInit {
  services: Service[] = [];
  biomes: Biome[] = [];

  slides: any[] = new Array(3).fill({ id: -1, imagePath: '', title: '', caption: '' });

  constructor(
    private dataService: DataService,
    private serviceService: ServiceService,
    private biomeService: BiomeService
  ) {
    this.slides[0] = {
      id: 0,
      imagePath: 'assets/images/carousel1.jpeg',
      title: 'jungle slide',
      caption: "Explorez la Majestueuse Jungle d'Arcadia",
    };
    this.slides[1] = {
      id: 1,
      imagePath: 'assets/images/carousel2.jpeg',
      title: 'swamp slide',
      caption: 'Découvrez les Secrets du Marais',
    };
    this.slides[2] = {
      id: 2,
      imagePath: 'assets/images/carousel3.jpeg',
      title: 'savanah slide',
      caption: 'Voyagez dans les Etendues de la Savane',
    };
  }

  ngOnInit(): void {
    this.loadElements();
  }

  loadElements(): void {
    this.dataService.loadData(this.serviceService).subscribe({
      next: (data) => {
        this.services = data;
        this.dataService.loadImages('Service', this.services, 'serviceId');
      },
      error: (error) => {
        console.error('Erreur lors du chargement des services:', error);
      },
    });

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
}
