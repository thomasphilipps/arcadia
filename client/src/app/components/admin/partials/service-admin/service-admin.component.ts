import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';

import { catchError, of } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Service } from '@app/interfaces/service.interface';
import { ServiceService } from '@app/services/service.service';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { SqlDataTableComponent } from '@templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '@templates/sql-form/sql-form.component';
import { CustomValidators } from '@app/validators/custom.validators';

@Component({
  selector: 'arz-service-admin',
  standalone: true,
  imports: [SqlDataTableComponent, SqlFormComponent, MatIconModule, MatButtonModule],
  templateUrl: './service-admin.component.html',
  styleUrl: './service-admin.component.scss',
})
export class ServiceAdminComponent implements OnInit {
  services: Service[] = [];
  serviceConfig: SqlViewDataConfig<Service>;

  editingService: Service | null = null;
  editingServiceId: number | null = null;

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<Service>;

  constructor(private serviceService: ServiceService) {
    this.serviceConfig = {
      label: 'Services',
      data: this.serviceService.getAllData(),
      primaryKey: 'serviceId',
      displayColumns: [
        {
          key: 'serviceName',
          label: 'Nom',
        },
        {
          key: 'serviceShortDescr',
          label: 'Description courte',
        },
        {
          key: 'serviceLongDescr',
          label: 'Description longue',
        },
      ],
      actions: { view: true, edit: true, delete: true },
      formFields: [
        {
          label: 'Nom',
          controlName: 'serviceName',
          type: 'text',
          maxLength: 32,
          validators: [
            Validators.required,
            Validators.maxLength(32),
            CustomValidators.nameFormat(),
          ],
          placeholder: 'Nom du service',
        },
        {
          label: 'Description abrégée',
          controlName: 'serviceShortDescr',
          type: 'textarea',
          maxLength: 255,
          minRows: 3,
          maxRows: 5,
          validators: [Validators.required, Validators.maxLength(255)],
          placeholder: 'Description courte du service',
        },
        {
          label: 'Description complète',
          controlName: 'serviceLongDescr',
          type: 'textarea',
          maxLength: 1000,
          minRows: 5,
          maxRows: 25,
          validators: [Validators.required, Validators.maxLength(1000)],
          placeholder: 'Description complète du service',
        },
      ],
      imageManager: {
        imageDescription: "Image d'illustration du service",
        referenceType: 'Service',
        referenceId: '',
      },
    };
  }

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

  saveService(data: Service) {
    const operation =
      this.editingServiceId === null
        ? this.serviceService.createData(data)
        : this.serviceService.updateData(this.editingServiceId, data);

    operation
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la sauvegarde du service:', error);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          alert('Service sauvegardé avec succès');
        },
        complete: () => {
          this.editingServiceId = null;
          this.editingService = null;
          this.sqlFormComponent.onCancelEdit();
        },
      });
  }

  addService(): void {
    this.editingServiceId = null;
    this.sqlFormComponent.editForm = true;
    this.sqlFormComponent.initializeForm(null);
  }

  viewService(serviceId: number): void {
    const service = this.services.find((service) => service.serviceId === serviceId);
    if (service) {
      alert(
        `Nom du service: ${service.serviceName}\n\nDescription courte: ${service.serviceShortDescr}\n\n` +
          `Description longue: ${service.serviceLongDescr}`
      );
    }
  }

  editService(serviceId: number): void {
    const editingService = this.services.find((s) => s.serviceId === serviceId);

    if (editingService) {
      this.serviceConfig.imageManager!.referenceId = serviceId.toString();
      this.editingServiceId = serviceId;
      this.sqlFormComponent.editForm = true;
      this.sqlFormComponent.initializeForm(editingService);
    }
  }

  deleteService(serviceId: number): void {
    const serviceName =
      this.services.find((service) => service.serviceId === serviceId)?.serviceName ?? '';
    const message =
      `Voulez-vous vraiment supprimer le service "${serviceName}" ?` +
      `\n\nCette action est irréversible !\n\n` +
      `Cliquez sur "OK" pour confirmer ou "Annuler" pour annuler l'opération\n\n`;

    if (confirm(message)) {
      this.serviceService
        .deleteData(serviceId)
        .pipe(
          catchError((error) => {
            console.error('Erreur lors de la suppression du service:', error);
            return of(null);
          })
        )
        .subscribe({
          next: () => {
            alert('Service supprimé avec succès');
          },
          complete: () => {
            this.editingService = null;
            this.sqlFormComponent.onCancelEdit();
          },
        });
    }
  }
}
