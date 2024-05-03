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
import { AdminComponentConfig } from '@app/interfaces/componentConfig.interface';
import { HttpClient } from '@angular/common/http';
import { ListDataComponent } from '../templates/list-data/list-data.component';

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
    ListDataComponent,
  ],
  templateUrl: './schedule-admin.component.html',
  styleUrl: './schedule-admin.component.scss',
})
export class ScheduleAdminComponent implements OnInit {
  scheduleConfig: AdminComponentConfig<Schedule>;

  schedules: Schedule[] = [];
  scheduleForm: FormGroup;
  editingSchedule: Schedule | null = null;

  openAmTime: string | null = null;
  closeAmTime: string | null = null;
  openPmTime: string | null = null;
  closePmTime: string | null = null;

  @Output() reloadEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private http: HttpClient
  ) {
    this.scheduleConfig = {
      label: 'Horaires',
      service: new ScheduleService(this.http),
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
      formFields: {
        openAmTime: [''],
        closeAmTime: [''],
        openPmTime: [''],
        closePmTime: [''],
      },
    };
    this.scheduleForm = this.fb.group(this.scheduleConfig.formFields, {
      validators: CustomValidators.timeOrderValidator(),
    });
  }

  ngOnInit(): void {
    this.scheduleService.getAllSchedules().subscribe((data) => {
      this.schedules = data;
    });
  }

  editSchedule(dayId: number) {
    this.editingSchedule = this.schedules.find((schedule) => schedule.dayId === dayId) || null;
    if (this.editingSchedule) {
      this.scheduleForm.patchValue({
        openAmTime: this.popSeconds(this.editingSchedule.openAm),
        closeAmTime: this.popSeconds(this.editingSchedule.closeAm),
        openPmTime: this.popSeconds(this.editingSchedule.openPm),
        closePmTime: this.popSeconds(this.editingSchedule.closePm),
      });
    }
  }

  onSaveSchedule() {
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
  }
}
