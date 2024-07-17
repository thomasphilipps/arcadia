import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MailConfig } from '@app/interfaces/mail.interface';
import { Message } from '@app/interfaces/message.interface';
import { FormField } from '@app/interfaces/sqlViewDataConfig.interface';
import { MailingService } from '@app/services/mailing.service';
import { CustomValidators } from '@app/validators/custom.validators';
import { environment } from '@environments/environment';

@Component({
  selector: 'arz-contact-client',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TextFieldModule,
    CdkTextareaAutosize,
  ],
  templateUrl: './contact-client.component.html',
  styleUrls: ['./contact-client.component.scss'],
})
export class ContactClientComponent {
  contactForm: FormGroup = new FormGroup({});

  contactFormFields: FormField[] = [
    {
      label: 'Sujet du message',
      controlName: 'messageSubject',
      type: 'text',
      maxLength: 50,
      validators: [Validators.required, Validators.maxLength(50)],
      placeholder: 'Sujet du message',
    },
    {
      label: 'Nom',
      controlName: 'contactName',
      type: 'text',
      maxLength: 50,
      validators: [Validators.required, Validators.maxLength(50), CustomValidators.nameFormat],
      placeholder: 'Votre nom',
    },
    {
      label: 'Email',
      controlName: 'contactEmail',
      type: 'text',
      maxLength: 50,
      validators: [Validators.required, Validators.email, Validators.maxLength(50)],
      placeholder: 'Votre email',
    },
    {
      label: 'Message',
      controlName: 'messageBody',
      type: 'textarea',
      maxLength: 500,
      minRows: 5,
      maxRows: 10,
      validators: [Validators.required, Validators.maxLength(500)],
      placeholder: 'Votre message',
    },
  ];

  constructor(private fb: FormBuilder, private mailingService: MailingService) {
    this.contactForm = this.toFormGroup(this.contactFormFields);
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

  onSendMessage(data: Message, formDirective: FormGroupDirective): void {
    const htmlMessage: string =
      `<html>` +
      `<body style="font-family: Arial, sans-serif;">` +
      `${data.messageBody}` +
      `</body>` +
      `</html>`;

    const mailContent: MailConfig = {
      from: data.contactEmail,
      to: environment.contactEmail,
      subject: data.messageSubject,
      text: data.messageBody,
      html: htmlMessage,
    };

    this.mailingService.sendEmail(mailContent).subscribe({
      next: (response) => {
        alert('Message envoyé avec succès');
        formDirective.resetForm(); // Réinitialiser le formulaire après l'envoi réussi
      },
      error: (error) => {
        alert(`Erreur lors de l'envoi du message: ${error.message}`);
      },
    });
  }

  onCancelMessage(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
  }
}
