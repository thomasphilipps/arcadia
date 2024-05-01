import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

import { catchError, of, take } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { Service } from '@app/interfaces/service.interface';
import { ServiceService } from '@app/services/service.service';
import { truncate, getFormValidationErrors } from '@app/utils/utils';
import { MyErrorStateMatcher } from '@app/utils/errorState';

@Component({
  selector: 'arz-service-admin',
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
  templateUrl: './service-admin.component.html',
  styleUrl: './service-admin.component.scss',
})
export class ServiceAdminComponent implements OnInit {
  services: Service[] = [];
  editingService: Service | null = null;
  editingServiceId: number | null = null;
  serviceForm: FormGroup;

  truncate = truncate;

  matcher = new MyErrorStateMatcher();

  displayedColumns: string[] = [
    'serviceId',
    'serviceName',
    'serviceShortDescr',
    'serviceLongDescr',
    'action',
  ];

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private _ngZone: NgZone
  ) {
    this.serviceForm = this.fb.group({
      serviceName: ['', [Validators.required, Validators.maxLength(32)]],
      serviceShortDescr: ['', [Validators.required, Validators.maxLength(255)]],
      serviceLongDescr: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  @ViewChild('longAutosize') longAutosize!: CdkTextareaAutosize;
  @ViewChild('shortAutoSize') shortAutosize!: CdkTextareaAutosize;

  triggerResize(fieldAutoSize: CdkTextareaAutosize) {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => fieldAutoSize.resizeToFitContent(true));
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
              alert('Service ajouté avec succès');
              // mise à jour de la liste des services
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
