import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Service } from '@app/interfaces/service.interface';
import { DataService } from '@app/services/data.service';
import { ServiceService } from '@app/services/service.service';

@Component({
  selector: 'arz-service-client',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './service-client.component.html',
  styleUrls: ['./service-client.component.scss'],
})
export class ServiceClientComponent implements OnInit {
  services: Service[] = [];

  constructor(private dataService: DataService, private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.dataService.loadData(this.serviceService).subscribe({
      next: (data) => {
        this.services = data;
        this.dataService.loadImages('Service', this.services, 'serviceId');
      },
      error: (error) => {
        console.error('Erreur lors du chargement des services:', error);
      },
    });
  }
}
