import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

import { catchError, of } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Service } from '@app/interfaces/service.interface';
import { ServiceService } from '@app/services/service.service';
import { truncate, getFormValidationErrors } from '@app/utils/utils';
import { MyErrorStateMatcher } from '@app/utils/errorState';
import { ListDataComponent } from '../templates/list-data/list-data.component';
import { HttpClient } from '@angular/common/http';
import { AdminComponentConfig } from '@app/interfaces/componentConfig.interface';

@Component({
  selector: 'arz-service-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TextFieldModule,
    CdkTextareaAutosize,
    ListDataComponent,
  ],
  templateUrl: './service-admin.component.html',
  styleUrl: './service-admin.component.scss',
})
export class ServiceAdminComponent implements OnInit {
  serviceConfig: AdminComponentConfig<Service>;

  services: Service[] = [];
  editingService: Service | null = null;
  editingServiceId: number | null = null;
  serviceForm: FormGroup;

  truncate = truncate;

  matcher = new MyErrorStateMatcher();
  @Output() reloadEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private http: HttpClient
  ) {
    this.serviceConfig = {
      label: 'Services',
      service: new ServiceService(this.http),
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
      formFields: {
        serviceName: ['', [Validators.required, Validators.maxLength(32)]],
        serviceShortDescr: ['', [Validators.required, Validators.maxLength(255)]],
        serviceLongDescr: ['', [Validators.required, Validators.maxLength(1000)]],
      },
    };
    this.serviceForm = this.fb.group(this.serviceConfig.formFields);
  }

  ngOnInit(): void {
    this.serviceService
      .getAllServices()
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération des services: ', error);
          return of([]);
        })
      )
      .subscribe((data) => {
        this.services = data;
      });
  }

  addService(): void {
    this.serviceForm.reset();
    this.editingServiceId = null;
    this.editingService = {
      serviceId: 0,
      serviceName: '',
      serviceShortDescr: '',
      serviceLongDescr: '',
    };
    this.serviceForm.reset();
    this.editingServiceId = null;
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
    this.editingServiceId = serviceId;
    this.editingService = this.services.find((service) => service.serviceId === serviceId) || null;
    if (this.editingService) {
      this.serviceForm.patchValue(
        {
          serviceName: this.editingService.serviceName,
          serviceShortDescr: this.editingService.serviceShortDescr,
          serviceLongDescr: this.editingService.serviceLongDescr,
        },
        { emitEvent: false }
      );
    }
  }

  deleteService(serviceId: number): void {
    const serviceName =
      this.services.find((service) => service.serviceId === serviceId)?.serviceName || '';
    const message =
      `Voulez-vous vraiment supprimer le service "${serviceName}" ?` +
      `\n\nCette action est irréversible !\n\n` +
      `Cliquez sur "OK" pour confirmer ou "Annuler" pour annuler l'opération\n\n`;

    if (
      confirm(
        `Voulez-vous vraiment supprimer le service "${serviceName}" ?\n\nCette action est irréversible !\n\n` +
          `Cliquez sur "OK" pour confirmer ou "Annuler" pour annuler l'opération\n\n`
      )
    ) {
      this.serviceService
        .deleteService(serviceId)
        .pipe(
          catchError((error) => {
            console.error('Erreur lors de la suppression du service:', error);
            return of(null);
          })
        )
        .subscribe({
          next: (result) => {
            this.reloadEvent.emit();
            alert('Service supprimé avec succès');
            this.services = this.services.filter((service) => service.serviceId !== serviceId);
          },
          complete: () => {
            this.editingService = null;
            this.serviceForm.reset();
          },
        });
    }
  }

  onSaveService(serviceId: number | null): void {
    const group = this.serviceForm;
    let data: Service | null = this.editingService;

    if (group.invalid) {
      const errors = getFormValidationErrors(group);
      console.error(`Erreur Erreur lors de la validation du formulaire: ${errors.join(', ')}`);
      return;
    }

    if (data) {
      data.serviceName = group.get('serviceName')?.value;
      data.serviceShortDescr = group.get('serviceShortDescr')?.value;
      data.serviceLongDescr = group.get('serviceLongDescr')?.value;
    }

    if (serviceId && data) {
      this.serviceService
        .updateService(serviceId, data)
        .pipe(
          catchError((error) => {
            console.error('Erreur lors de la mise à jour du service:', error);
            return of(null);
          })
        )
        .subscribe({
          next: (result) => {
            this.reloadEvent.emit();
            alert('Service mis à jour avec succès');
          },
          complete: () => {
            this.editingService = null;
            this.serviceForm.reset();
          },
        });
    } else {
      if (data) {
        this.serviceService
          .createService(data)
          .pipe(
            catchError((error) => {
              console.error("Erreur lors de l'ajout du service:", error);
              return of(null);
            })
          )
          .subscribe({
            next: (result) => {
              this.reloadEvent.emit();
              alert('Service ajouté avec succès');
              result ? (this.services = [...this.services, result]) : null;
            },
            complete: () => {
              this.editingService = null;
              this.serviceForm.reset();
            },
          });
      }
    }
  }

  onCancelEdit(): void {
    this.serviceForm.reset();
    this.editingService = null;
  }
}
