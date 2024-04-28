import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Service } from '@app/interfaces/service.interface';
import { ServiceService } from '@app/services/service.service';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'arz-services-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './service-admin.component.html',
  styleUrl: './service-admin.component.scss',
})
export class ServicesAdminComponent implements OnInit {
  services: Service[] = [];
  //serviceForm: FormGroup;

  constructor(private fb: FormBuilder, private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceService.getAllServices().subscribe((data) => {
      this.services = data;
    });
  }
}
