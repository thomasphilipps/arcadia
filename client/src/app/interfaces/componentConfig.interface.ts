import { DataService } from './dataService';

export interface AdminComponentConfig<T> {
  label: string;
  service: DataService<T>;
  primaryKey: string | number;
  displayColumns: {
    key: string;
    label: string;
  }[];
  actions?: { view: boolean; edit: boolean; delete: boolean };
  formFields: { [key: string]: any[] };
}
