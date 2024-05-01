import { DataService } from './dataService';

interface AdminComponentConfig<T> {
  service: DataService<T>;
  displayColumns: string[];
  formFields: { [key: string]: any[] };
}
