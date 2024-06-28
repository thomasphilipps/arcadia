import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Service } from '@app/interfaces/service.interface';
import { ImageService } from '@app/services/image.service';
import { ServiceService } from '@app/services/service.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'arz-service-client',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './service-client.component.html',
  styleUrls: ['./service-client.component.scss'],
})
export class ServiceClientComponent implements OnInit {
  services: Service[] = [];

  constructor(private serviceService: ServiceService, private imageService: ImageService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.loadData();
    this.serviceService.getAllData().subscribe({
      next: (services) => {
        this.services = services;
        this.loadImages();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données:', error);
      },
    });
  }

  loadImages() {
    this.services.forEach(async (service) => {
      try {
        const images = await this.fetchImagesForService(service.serviceId);
        service.images = images || [];
      } catch (error) {
        console.error(
          `Erreur lors du chargement des images pour le service avec ID: ${service.serviceId}`,
          error
        );
        service.images = []; // Set to empty array to avoid display issues
      }
    });
  }

  // Effectue la requête pour charger les images d'un service

  async fetchImagesForService(serviceId: number | string) {
    try {
      const response = await firstValueFrom(
        this.imageService.getImageByReferenceTypeAndId('Service', serviceId.toString())
      );
      return response;
    } catch (error) {
      // Handle the error, maybe log it and return an empty array or rethrow the error
      throw new Error('Erreur lors de la récupération des images');
    }
  }
}
