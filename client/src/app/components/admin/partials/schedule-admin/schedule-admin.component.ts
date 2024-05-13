import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

import { Schedule } from '@interfaces/schedule.interface';
import { ScheduleService } from '@services/schedule.service';
import { CustomValidators } from '@validators/custom.validators';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { SqlDataTableComponent } from '../templates/sql-data-table/sql-data-table.component';

@Component({
  selector: 'arz-schedule-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxMaterialTimepickerModule,
    SqlDataTableComponent,
  ],
  templateUrl: './schedule-admin.component.html',
  styleUrl: './schedule-admin.component.scss',
})
export class ScheduleAdminComponent implements OnInit {
  // scheduleConfig: AdminComponentConfig<Schedule>;
  scheduleConfig: SqlViewDataConfig<Schedule>;

  schedules: Schedule[] = [];
  // scheduleForm: FormGroup;
  editingSchedule: Schedule | null = null;

  openAmTime: string | null = null;
  closeAmTime: string | null = null;
  openPmTime: string | null = null;
  closePmTime: string | null = null;

  @Output() reloadEvent = new EventEmitter<void>();

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
          label: 'Ouverture AM',
          controlName: 'openAmTime',
          type: 'time',
        },
        {
          label: 'Fermeture AM',
          controlName: 'closeAmTime',
          type: 'time',
        },
        {
          label: 'Ouverture PM',
          controlName: 'openPmTime',
          type: 'time',
        },
        {
          label: 'Fermeture PM',
          controlName: 'closePmTime',
          type: 'time',
        },
      ],
      customValidators: [CustomValidators.timeOrderValidator()],
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
    console.log(editingSchedules);
    /* 
    this.editingSchedule = this.schedules.find((schedule) => schedule.dayId === dayId) || null;
    if (this.editingSchedule) {
      this.scheduleForm.patchValue({
        openAmTime: this.popSeconds(this.editingSchedule.openAm),
        closeAmTime: this.popSeconds(this.editingSchedule.closeAm),
        openPmTime: this.popSeconds(this.editingSchedule.openPm),
        closePmTime: this.popSeconds(this.editingSchedule.closePm),
      });
    } */
  }

  /*  onSaveSchedule() {
    const group = this.scheduleForm;
    let data = this.editingSchedule;

    if (group.invalid) {
      return alert(`Erreur: ${group.errors?.['timeOrder']}`);
    }

    if (data) {
      data.openAm = this.formatTime(group.get('openAmTime')?.value);
      data.closeAm = this.formatTime(group.get('closeAmTime')?.value);
      data.openPm = this.formatTime(group.get('openPmTime')?.value);
      data.closePm = this.formatTime(group.get('closePmTime')?.value);

      this.scheduleService.updateSchedule(data.dayId, data).subscribe({
        next: () => {
          this.reloadEvent.emit();
          this.editingSchedule = null;
          alert('Horaires modifiées');
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour des horaires', err);
          alert('Erreur lors de la mise à jour des horaires');
        },
      });
    }
  }

  onCancelEdit() {
    this.editingSchedule = null;
  }

  onResetOpenAmTime() {
    this.scheduleForm.patchValue({ openAmTime: null });
  }

  onResetCloseAmTime() {
    this.scheduleForm.patchValue({ closeAmTime: null });
  }

  onResetOpenPmTime() {
    this.scheduleForm.patchValue({ openPmTime: null });
  }

  onResetClosePmTime() {
    this.scheduleForm.patchValue({ closePmTime: null });
  }

  private formatTime(time: string | null): string | null {
    if (time === null || time === '') {
      return null;
    }
    if (!/^\d{2}:\d{2}$/.test(time)) {
      console.error('Invalid time format');
      return null;
    }
    return `${time}:00`;
  }

  private popSeconds(timeString: string | null): string {
    if (!timeString) {
      return '';
    }
    const time = timeString.slice(0, -3);
    return time;
  } */
}
