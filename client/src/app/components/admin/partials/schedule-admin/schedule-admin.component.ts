import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Schedule } from '@interfaces/schedule.interface';
import { ScheduleService } from '@services/schedule.service';
import { CustomValidators } from '@validators/custom.validators';

@Component({
  selector: 'arz-schedule-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule],
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

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService //private datePipe: DatePipe
  ) {
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
      console.log(this.schedules);
    });
  }
}
