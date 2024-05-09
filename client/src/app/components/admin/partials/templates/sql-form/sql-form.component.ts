import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormField, SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';

interface FormModel {
  [key: string]: any;
}

@Component({
  selector: 'arz-sql-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    TextFieldModule,
    CdkTextareaAutosize,
  ],
  templateUrl: './sql-form.component.html',
  styleUrl: './sql-form.component.scss',
})
export class SqlFormComponent<T> implements OnInit {
  @Input() config?: SqlViewDataConfig<T>;
  @Output() saveData = new EventEmitter<T>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  editForm: boolean = false;
  formTitle: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.config?.formFields
      ? (this.form = this.toFormGroup(this.config.formFields))
      : console.error('Erreur lors de la lecture des champs du formulaire.');
  }

  toFormGroup(formFields: FormField[]): FormGroup {
    const group: any = {};

    formFields.forEach((field) => {
      group[field.controlName] = field.validators
        ? this.fb.control('', field.validators)
        : this.fb.control('');
    });

    return this.fb.group(group);
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

  onSaveData(): void {}

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
