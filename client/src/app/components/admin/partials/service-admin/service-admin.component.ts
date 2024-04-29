import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Service } from '@app/interfaces/service.interface';
import { ServiceService } from '@app/services/service.service';
import { truncate } from '@app/utils/utils';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ErrorStateMatcher } from '@angular/material/core';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { catchError, of, take } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
          console.error('Erreur lors de la récupération des services:', error);
          return of([]);
        })
      )
      .subscribe((data) => {
        this.services = data;
      });
  }

  addService() {
    this.editingService = {
      serviceId: 0,
      serviceName: '',
      serviceShortDescr: '',
      serviceLongDescr: '',
    };
    this.serviceForm.reset();
    this.editingServiceId = null;
  }

  editService(serviceId: number) {
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

  onSaveService(serviceId: number | null) {
    const group = this.serviceForm;
    let data = this.editingService;

    if (group.invalid) {
      const errors = this.getFormValidationErrors();
      console.error(`Erreur : ${errors.join(', ')}`);
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
          .addService(data)
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

  onCancelEdit() {
    this.serviceForm.reset();
    this.editingService = null;
  }

  deleteService(serviceId: number) {
    const serviceName =
      this.services.find((service) => service.serviceId === serviceId)?.serviceName || '';
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

  private getFormValidationErrors(): string[] {
    const errorMessages: string[] = [];

    Object.keys(this.serviceForm.controls).forEach((key) => {
      const controlErrors = this.serviceForm.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((keyError) => {
          switch (keyError) {
            case 'required':
              errorMessages.push(`${key} est requis`);
              break;
            case 'maxlength':
              const maxLength = controlErrors['maxlength'].requiredLength;
              errorMessages.push(`${key} doit contenir au maximum ${maxLength} caractères`);
              break;
          }
        });
      }
    });

    return errorMessages;
  }
}
