import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { truncate } from '@app/utils/utils';
import { Subscription, catchError, of } from 'rxjs';

@Component({
  selector: 'arz-sql-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './sql-data-table.component.html',
  styleUrl: './sql-data-table.component.scss',
})
export class SqlDataTableComponent<T> implements OnChanges, OnDestroy {
  private subscription!: Subscription;

  data: T[] = [];
  displayedColumns: string[] = [];

  truncate = truncate;

  @Input() config!: SqlViewDataConfig<T>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.displayedColumns = [
        ...this.config.displayColumns.map((column) => column.key),
        ...(this.config.actions ? ['actions'] : []),
      ];
      this.subscription = this.config.data.subscribe({
        next: (data) => {
          this.data = data;
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
