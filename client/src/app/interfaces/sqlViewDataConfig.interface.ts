import { Observable } from 'rxjs';

export interface SqlViewDataConfig<T> {
  label: string;
  data: Observable<T[]>;
  primaryKey: string | number;
  displayColumns: {
    key: string;
    label: string;
  }[];
  actions?: { view: boolean; edit: boolean; delete: boolean };
}
