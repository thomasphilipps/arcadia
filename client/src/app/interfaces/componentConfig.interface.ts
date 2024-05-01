import { DataService } from './dataService';

export interface AdminComponentConfig<T> {
  label: string;
  service: DataService<T>;
  displayColumns: string[];
  formFields: { [key: string]: any[] };
}
