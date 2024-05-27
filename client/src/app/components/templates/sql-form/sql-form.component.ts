import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  FormField,
  OptionArray,
  SqlViewDataConfig,
} from '@app/interfaces/sqlViewDataConfig.interface';

interface FormModel {
  [key: string]: any;
}

@Component({
  selector: 'arz-sql-form',
  standalone: true,
  providers: [provideLuxonDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    TextFieldModule,
    CdkTextareaAutosize,
  ],
  templateUrl: './sql-form.component.html',
  styleUrls: ['./sql-form.component.scss'],
})
export class SqlFormComponent<T> implements OnInit {
  @Input() config!: SqlViewDataConfig<T>;
  @Input() speciesOptions: OptionArray[] = [];
  @Output() saveData = new EventEmitter<T>();
  @Output() cancel = new EventEmitter<void>();
  @Output() biomeChange = new EventEmitter<number>();

  form!: FormGroup;
  hide: boolean = true;

  editForm: boolean = false;
  formTitle: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.config.formFields
      ? (this.form = this.toFormGroup(this.config.formFields, this.config.customValidators))
      : console.error('Erreur lors de la lecture des champs du formulaire.');

    // AnimalAdminComponent specific code
    this.form.get('biomeKey')?.valueChanges.subscribe((biomeId) => {
      this.speciesOptions = [];
      if (biomeId) {
        this.form.get('specieKey')?.enable();
        this.biomeChange.emit(biomeId);
      } else {
        this.form.get('specieKey')?.disable();
      }
    });
  }

  toFormGroup(formFields: FormField[], validatorsOption?: ValidatorFn[]): FormGroup {
    const group: any = {};

    formFields.forEach((field) => {
      group[field.controlName] = field.validators
        ? this.fb.control('', field.validators)
        : this.fb.control('');
    });

    return this.fb.group(group, { validators: validatorsOption });
  }

  initializeForm<T extends FormModel>(data: T | null): void {
    if (data) {
      const dataName = this.extractValueByNameKey(data);
      this.form.patchValue(data, { emitEvent: false });
      this.formTitle = `Modifier ${dataName}`;
    } else {
      this.formTitle = 'Ajouter un enregistrerment';
      this.form.reset();
    }
  }

  onResetTime(controlName: string): void {
    this.form.get(controlName)?.reset();
  }

  onSaveData(data: T) {
    this.saveData.emit(data);
  }

  onCancelEdit(): void {
    this.form.reset();
    this.editForm = false;
  }

  private extractValueByNameKey(object: Record<string, any>): string | null {
    for (let key in object) {
      if (object.hasOwnProperty(key) && key.includes('Name')) {
        return object[key];
      }
    }
    return null;
  }
}
