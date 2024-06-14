import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

import { catchError, of } from 'rxjs';

import { Schedule } from '@interfaces/schedule.interface';
import { ScheduleService } from '@services/schedule.service';
import { CustomValidators } from '@validators/custom.validators';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { SqlDataTableComponent } from '@templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '@templates/sql-form/sql-form.component';

@Component({
  selector: 'arz-schedule-admin',
  standalone: true,
  imports: [CommonModule, SqlDataTableComponent, SqlFormComponent],
  templateUrl: './schedule-admin.component.html',
  styleUrl: './schedule-admin.component.scss',
})
export class ScheduleAdminComponent implements OnInit {
  scheduleConfig: SqlViewDataConfig<Schedule>;

  schedules: Schedule[] = [];
  editingScheduleId: number | null = null;

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<Schedule>;

  constructor(private scheduleService: ScheduleService) {
    this.scheduleConfig = {
      label: 'Horaires',
      data: this.scheduleService.getAllData(),
      primaryKey: 'dayId',
      displayColumns: [
        {
          key: 'dayName',
          label: 'Jour',
        },
        {
          key: 'openAm',
          label: 'Ouverture AM',
        },
        {
          key: 'closeAm',
          label: 'Fermeture AM',
        },
        {
          key: 'openPm',
          label: 'Ouverture PM',
        },
        {
          key: 'closePm',
          label: 'Fermeture PM',
        },
      ],
      actions: { view: false, edit: true, delete: false },
      formFields: [
        {
          label: 'Ouverture Matin',
          controlName: 'openAm',
          type: 'time',
        },
        {
          label: 'Fermeture Matin',
          controlName: 'closeAm',
          type: 'time',
        },
        {
          label: 'Ouverture Après-midi',
          controlName: 'openPm',
          type: 'time',
        },
        {
          label: 'Fermeture Après-midi',
          controlName: 'closePm',
          type: 'time',
        },
      ],
      customValidators: [CustomValidators.timeOrderValidator()],
      noFilter: true,
      noPaginator: true,
    };
  }

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules(): void {
    this.scheduleService.loadData();
    this.scheduleService.getAllData().subscribe({
      next: (schedules) => {
        this.schedules = schedules;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des horaires', error);
      },
    });
  }

  editSchedule(dayId: number) {
    const editingSchedules = this.schedules.find((schedule) => schedule.dayId === dayId);
    if (editingSchedules) {
      this.editingScheduleId = dayId;
      this.sqlFormComponent.editForm = true;
      this.sqlFormComponent.initializeForm(editingSchedules);
    }
  }

  saveSchedule(data: Schedule) {
    const operation =
      this.editingScheduleId !== null
        ? this.scheduleService.updateData(this.editingScheduleId, data)
        : null;

    operation
      ?.pipe(
        catchError((error) => {
          console.error('Erreur lors de la sauvegarde des horaires', error);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          alert('Les horaires ont été sauvegardés');
        },
        complete: () => {
          this.editingScheduleId = null;
          this.sqlFormComponent.onCancelEdit();
        },
      });
  }
}
