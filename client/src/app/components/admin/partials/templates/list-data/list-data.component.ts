import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable, catchError, first, of, startWith } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { AdminComponentConfig } from '@app/interfaces/componentConfig.interface';
import { truncate } from '@app/utils/utils';

@Component({
  selector: 'arz-list-data',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './list-data.component.html',
  styleUrl: './list-data.component.scss',
})
export class ListDataComponent<T> implements OnInit {
  @Output() editData = new EventEmitter();
  @Output() deleteData = new EventEmitter();
  @Output() viewData = new EventEmitter();

  @Input() config!: AdminComponentConfig<T>;
  @Input() reloadTrigger!: Observable<void>;

  data: T[] = [];

  displayedColumns: string[] = [];

  truncate = truncate;

  constructor() {}

  ngOnInit(): void {
    this.reloadTrigger
      .pipe(
        startWith(null),
        catchError((error) => {
          console.error('Erreur lors de la récupération des données: ', error);
          return of([]); // Assure que l'erreur ne brise pas le flux.
        })
      )
      .subscribe(() => {
        this.loadData();
      });

    this.displayedColumns = this.config.displayColumns.map((column) => column.key);
    this.config.actions ? this.displayedColumns.push('actions') : null;
  }

  emitViewEvent<T>(data: T) {
    const primaryKeyValue = this.config.primaryKey as keyof T;
    let dataToEmit = data[primaryKeyValue];
    this.viewData.emit(dataToEmit);
  }

  emitEditEvent<T>(data: T) {
    const primaryKeyValue = this.config.primaryKey as keyof T;
    let dataToEmit = data[primaryKeyValue];
    this.editData.emit(dataToEmit);
  }

  emitDeleteEvent<T>(data: T) {
    const primaryKeyValue = this.config.primaryKey as keyof T;
    let dataToEmit = data[primaryKeyValue];
    this.deleteData.emit(dataToEmit);
  }

  loadData() {
    this.config.service
      .getAllData()
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération des données: ', error);
          return of([]);
        })
      )
      .subscribe((data) => {
        this.data = data;
      });
  }
}
