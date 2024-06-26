import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Animal } from '@app/interfaces/animal.interface';
import { Biome } from '@app/interfaces/biome.interface';
import { Service } from '@app/interfaces/service.interface';
import { AnimalService } from '@app/services/animal.service';
import { BiomeService } from '@app/services/biome.service';
import { ImageService } from '@app/services/image.service';
import { ServiceService } from '@app/services/service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'arz-home-client',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './home-client.component.html',
  styleUrl: './home-client.component.scss',
})
export class HomeClientComponent implements OnInit {
  services: Service[] = [];
  biomes: Biome[] = [];
  animals: Animal[] = [];

  constructor(
    private serviceService: ServiceService,
    private biomeService: BiomeService,
    private animalService: AnimalService,
    private imageService: ImageService
  ) {}
  ngOnInit(): void {
    this.loadElements();
  }

  loadElements(): void {
    this.loadData(this.serviceService, (data) => {
      this.services = data;
      this.loadImages('Service', this.services, 'serviceId');
    });
    this.loadData(this.biomeService, (data) => {
      this.biomes = data;
      this.loadImages('Biome', this.biomes, 'biomeId');
    });
    this.loadData(this.animalService, (data) => {
      this.animals = data;
      this.loadImages('Animal', this.animals, 'animalId');
    });
  }

  loadImages(entityType: string, entities: any[], idField: string): void {
    entities.forEach((entity) => {
      this.imageService
        .getImageByReferenceTypeAndId(entityType, entity[idField].toString())
        .subscribe({
          next: (images) => {
            entity.images = images;
          },
          error: (error) => {
            console.error(`Erreur lors du chargement des images pour ${entityType}:`, error);
          },
        });
    });
  }

  loadData<T>(
    service: { loadData: () => void; getAllData: () => Observable<T[]> },
    assign: (data: T[]) => void
  ): void {
    service.loadData();
    service.getAllData().subscribe({
      next: (data) => {
        assign(data);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données:', error);
      },
    });
  }
}
