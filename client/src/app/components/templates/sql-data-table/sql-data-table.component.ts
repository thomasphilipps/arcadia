import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { truncate, convertIsoDateToLocaleDate } from '@app/utils/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'arz-sql-data-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatSortModule],
  templateUrl: './sql-data-table.component.html',
  styleUrls: ['./sql-data-table.component.scss'],
})
export class SqlDataTableComponent<T> implements OnChanges, OnDestroy, AfterViewInit {
  private subscription!: Subscription;

  @Input() config!: SqlViewDataConfig<T>;
  @Input() getRoleLabel!: (role: string) => string;

  @Output() editData = new EventEmitter();
  @Output() deleteData = new EventEmitter();
  @Output() viewData = new EventEmitter();

  data: T[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>();

  truncate = truncate;
  convertDate = convertIsoDateToLocaleDate;

  @ViewChild(MatSort) sort!: MatSort;

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
          this.dataSource.data = this.data;
        },
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.config.sortable) {
      this.dataSource.sort = this.sort;
    }
  }

  private emitEvent(eventEmitter: EventEmitter<any>, data: T): void {
    const primaryKeyValue = this.config.primaryKey as keyof T;
    let dataToEmit = data[primaryKeyValue];
    eventEmitter.emit(dataToEmit);
  }

  emitViewEvent(data: T) {
    this.emitEvent(this.viewData, data);
  }

  emitEditEvent(data: T) {
    this.emitEvent(this.editData, data);
  }

  emitDeleteEvent(data: T) {
    this.emitEvent(this.deleteData, data);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }

  isBooleanColumn(key: string): boolean {
    return this.config.booleanColumns?.includes(key) ?? false;
  }
}
