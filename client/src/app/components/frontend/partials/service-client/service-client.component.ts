import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Service } from '@app/interfaces/service.interface';
import { ImageService } from '@app/services/image.service';
import { ServiceService } from '@app/services/service.service';

@Component({
  selector: 'arz-service-client',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './service-client.component.html',
  styleUrl: './service-client.component.scss',
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

  loadImages(): void {
    this.services.forEach((service) => {
      this.imageService
        .getImageByReferenceTypeAndId('Service', service.serviceId.toString())
        .subscribe({
          next: (images) => {
            service.images = images;
          },
          error: (error) => {
            console.error('Erreur lors du chargement des images:', error);
          },
        });
    });
  }
}
