export interface Schedule {
  dayId: number;
  dayName: string;
  openAm: string | null;
  closeAm: string | null;
  openPm: string | null;
  closePm: string | null;
  amSchedule: string;
  pmSchedule: string;
}
