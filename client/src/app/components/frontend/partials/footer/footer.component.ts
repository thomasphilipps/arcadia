import { Component, OnInit } from '@angular/core';
import { Schedule } from '@app/interfaces/schedule.interface';
import { ScheduleService } from '@app/services/schedule.service';

@Component({
  selector: 'arz-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  schedules: Schedule[] = [];
  today: number = new Date().getDay();

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService.loadData();
    this.scheduleService.getAllData().subscribe({
      next: (data: Schedule[]) => {
        this.schedules = data.map((day) => ({
          ...day,
          amSchedule: this.formatFirstLine(day),
          pmSchedule: this.formatSecondLine(day),
        }));
      },
      error: (error) => console.error('Erreur lors de la récupération des horaires', error),
    });
  }

  private formatFirstLine(day: Schedule): string {
    if (!day.openAm) {
      return 'Fermé';
    }

    const closeTime = day.closeAm || day.closePm || '';

    return closeTime ? this.formatTime(day.openAm) + ' - ' + this.formatTime(closeTime) : 'Fermé';
  }

  private formatSecondLine(day: Schedule): string {
    if (day.openAm && day.closeAm && !day.openPm) {
      return 'Fermé';
    }

    if (!day.openAm && !day.openPm) {
      return '';
    }

    if (day.openPm && day.closePm) {
      return this.formatTime(day.openPm) + ' - ' + this.formatTime(day.closePm);
    }

    return '';
  }

  private formatTime(time: string): string {
    return time.slice(0, 2) + 'h' + time.slice(3, 5);
  }
}
