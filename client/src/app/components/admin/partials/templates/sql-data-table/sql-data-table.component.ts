import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { truncate, convertIsoDateToLocaleDate } from '@app/utils/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'arz-sql-data-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './sql-data-table.component.html',
  styleUrl: './sql-data-table.component.scss',
})
export class SqlDataTableComponent<T> implements OnChanges, OnDestroy {
  private subscription!: Subscription;

  @Input() config!: SqlViewDataConfig<T>;

  @Output() editData = new EventEmitter();
  @Output() deleteData = new EventEmitter();
  @Output() viewData = new EventEmitter();

  data: T[] = [];
  displayedColumns: string[] = [];

  truncate = truncate;
  convertDate = convertIsoDateToLocaleDate;

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
}
