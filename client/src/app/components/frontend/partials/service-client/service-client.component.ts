import { Component, OnInit } from '@angular/core';
import { Service } from '@app/interfaces/service.interface';
import { ServiceService } from '@app/services/service.service';

@Component({
  selector: 'arz-service-client',
  standalone: true,
  imports: [],
  templateUrl: './service-client.component.html',
  styleUrl: './service-client.component.scss',
})
export class ServiceClientComponent implements OnInit {
  services: Service[] = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.loadData();
    this.serviceService.getAllData().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données:', error);
      },
    });
  }
}
