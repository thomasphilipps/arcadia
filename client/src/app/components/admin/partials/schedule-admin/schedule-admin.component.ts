import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Schedule } from '@interfaces/schedule.interface';
import { ScheduleService } from '@services/schedule.service';
import { CustomValidators } from '@validators/custom.validators';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'arz-schedule-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    NgxMaterialTimepickerModule,
  ],
  templateUrl: './schedule-admin.component.html',
  styleUrl: './schedule-admin.component.scss',
})
export class ScheduleAdminComponent implements OnInit {
  schedules: Schedule[] = [];
  scheduleForm: FormGroup;
  editingSchedule: Schedule | null = null;

  displayedColumns: string[] = ['dayName', 'openAm', 'closeAm', 'openPm', 'closePm', 'action'];

  openAmTime: string | null = null;
  closeAmTime: string | null = null;
  openPmTime: string | null = null;
  closePmTime: string | null = null;

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService) {
    this.scheduleForm = this.fb.group(
      {
        openAmTime: new FormControl(''),
        closeAmTime: new FormControl(''),
        openPmTime: new FormControl(''),
        closePmTime: new FormControl(''),
      },
      { validators: CustomValidators.timeOrderValidator() }
    );
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

  onEditSchedule() {
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

  popSeconds(timeString: string | null): string {
    if (!timeString) {
      return '';
    }
    const time = timeString.slice(0, -3);
    return time;
  }
}
