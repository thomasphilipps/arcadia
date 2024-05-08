import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { SqlGlobalService } from '@app/services/sql-global.service';
import { truncate } from '@app/utils/utils';
import { Subscription, catchError, of } from 'rxjs';

@Component({
  selector: 'arz-sql-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './sql-data-table.component.html',
  styleUrl: './sql-data-table.component.scss',
})
export class SqlDataTableComponent<T> implements OnInit {
  private subscription!: Subscription;

  data: T[] = [];
  displayedColumns: string[] = [];

  truncate = truncate;

  @Input() config!: SqlViewDataConfig<T>;

  constructor(private sqlService: SqlGlobalService<T>) {}

  ngOnInit(): void {
    this.subscription = this.sqlService
      .getAllData()
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération des données', error);
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.data = data;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
