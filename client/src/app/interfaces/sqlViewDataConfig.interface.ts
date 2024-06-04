import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export interface SqlViewDataConfig<T> {
  label: string;
  data: Observable<T[]>;
  primaryKey: string | number;
  displayColumns?: {
    key: string;
    label: string;
  }[];
  actions?: {
    view?: boolean;
    edit?: boolean | ((item: T) => boolean);
    delete?: boolean | ((item: T) => boolean);
    newSub?: boolean;
  };
  booleanColumns?: string[];
  sortable?: boolean;
  formFields?: FormField[];
  customValidators?: ValidatorFn[];
  noFilter?: boolean;
  noPaginator?: boolean;
}

export interface FormField {
  label: string;
  controlName: string;
  type?: string;
  maxLength?: number;
  minRows?: number;
  maxRows?: number;
  minValue?: number;
  maxValue?: number;
  selectOptions?: OptionArray[];
  radioOptions?: OptionArray[];
  validators?: ValidatorFn[];
  placeholder?: string;
}

export interface OptionArray {
  idValue: string | number;
  label: string;
}
