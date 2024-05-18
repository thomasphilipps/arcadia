import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SqlDataTableComponent } from '../templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '../templates/sql-form/sql-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User } from '@app/interfaces/user.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { UserService } from '@app/services/user.service';
import { MailingService } from '@app/services/mailing.service';
import { MailConfig } from '@app/interfaces/mail.interface';
import { ROLE_LABELS } from '@app/utils/role-constants';
import { Validators } from '@angular/forms';
import { CustomValidators } from '@app/validators/custom.validators';
import { catchError, of } from 'rxjs';
import { environment } from '@environments/environment.development';

@Component({
  selector: 'arz-user-admin',
  standalone: true,
  imports: [CommonModule, SqlDataTableComponent, SqlFormComponent, MatIconModule, MatButtonModule],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.scss',
})
export class UserAdminComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  userConfig: SqlViewDataConfig<User>;

  editingUserId: string | null = null;
  initialFormValues: Partial<User> = {};

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<User>;

  constructor(private userService: UserService, private mailingService: MailingService) {
    this.userConfig = {
      label: 'Utilisateurs',
      data: this.userService.getAllData(),
      primaryKey: 'userId',
      displayColumns: [
        { key: 'userName', label: 'Nom' },
        { key: 'userEmail', label: 'Email' },
        { key: 'userRole', label: 'Rôle' },
      ],
      actions: { view: true, edit: false, delete: true },
      formFields: [
        {
          label: 'Rôle',
          controlName: 'userRole',
          type: 'select',
          selectOptions: [
            { idValue: 'ROLE_EMPLOYEE', label: 'Employé' },
            { idValue: 'ROLE_VETERINARY', label: 'Vétérinaire' },
          ],
          validators: [Validators.required],
          placeholder: "Rôle de l'utilisateur",
        },
        {
          label: 'Nom',
          controlName: 'userName',
          type: 'text',
          maxLength: 32,
          validators: [
            Validators.required,
            Validators.maxLength(32),
            CustomValidators.nameFormat(),
          ],
          placeholder: "Nom de l'utilisateur",
        },
        {
          label: 'Email',
          controlName: 'userEmail',
          type: 'text',
          maxLength: 255,
          validators: [
            Validators.required,
            Validators.email,
            Validators.maxLength(255),
            CustomValidators.uniqueEmail(this.users),
          ],
          placeholder: "Email de l'utilisateur",
        },
        {
          label: 'Mot de passe',
          controlName: 'userPassword',
          type: 'password',
          maxLength: 64,
          validators: [
            Validators.required,
            Validators.maxLength(64),
            CustomValidators.passwordComplexity(),
          ],
          placeholder: "Mot de passe de l'utilisateur",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    // Update email validator after view init
    this.updateEmailValidator();
  }

  loadUsers() {
    this.userService.loadData();
    this.userService.getAllData().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données: ', error);
      },
    });
  }

  addUser() {
    this.editingUserId = null;
    this.sqlFormComponent.editForm = true;
    this.sqlFormComponent.initializeForm(null);
    this.updateEmailValidator();
  }

  viewUser(userId: string): void {
    const user = this.users.find((u) => u.userId === userId);
    if (user) {
      alert(
        `Nom: ${user.userName}\n\nEmail: ${user.userEmail}\n\n` +
          `Rôle: ${this.getRoleLabel(user.userRole)}`
      );
    }
  }

  deleteUser(userId: string) {
    const userName = this.users.find((u) => u.userId === userId)?.userName;
    const message =
      `Voulez-vous vraiment supprimer l'utilisateur "${userName}" ?` +
      `\n\nCette action est irréversible !\n\n` +
      `Cliquez sur "OK" pour confirmer ou "Annuler" pour annuler l'opération\n\n`;

    if (confirm(message)) {
      this.userService
        .deleteData(userId)
        .pipe(
          catchError((error) => {
            console.error("Erreur lors de la suppression de l'utilisateur", error);
            return of(null);
          })
        )
        .subscribe({
          next: () => {
            alert('Utilisateur supprimé avec succès');
          },
          complete: () => {
            this.editingUserId = null;
            this.sqlFormComponent.onCancelEdit();
          },
        });
    }
  }

  saveUser(user: User) {
    const operation =
      this.editingUserId === null
        ? this.userService.createData(user)
        : this.userService.updateData(this.editingUserId, this.getChangedFields(user));

    operation
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de la sauvegarde de l'utilisateur: ", error);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          alert('Utilisateur sauvegardé avec succès');
          this.sendMail(user);
        },
        complete: () => {
          this.editingUserId = null;
          this.sqlFormComponent.onCancelEdit();
        },
      });
  }

  sendMail(user: User) {
    const textMessage: string =
      `Bonjour ${user.userName},\n\n` +
      `Votre espace personnel ${this.getRoleLabel(user.userRole).toLowerCase()} ` +
      `sur Arcadia Zoo a été créé.\n` +
      `Vous pouvez désormais vous connecter à votre compte avec votre adresse email.\n\n` +
      `Veuillez vous rapprocher de l'administrateur pour récupérer votre mot de passe.\n\n` +
      `Cordialement,\n\n` +
      `L'équipe Arcadia Zoo.`;
    const htmlMessage: string =
      `<html>` +
      `<body style="font-family: Arial, sans-serif;">` +
      `<p>Bonjour ${user.userName},</p>
      <br>Votre espace personnel ${this.getRoleLabel(
        user.userRole
      ).toLowerCase()} sur Arcadia Zoo a été créé.</br>` +
      `Vous pouvez désormais vous connecter à votre compte avec votre adresse email.</p>` +
      `<p>Veuillez vous rapprocher de l'administrateur pour récupérer votre mot de passe.</p>` +
      `<p>Cordialement,</p>` +
      `<p>L'équipe Arcadia Zoo.</p>` +
      `</body>` +
      `</html>`;

    const mailContent: MailConfig = {
      to: user.userEmail,
      subject: 'Votre espace personnel Arcadia Zoo a été créé',
      text: textMessage,
      html: htmlMessage,
    };

    this.mailingService.sendEmail(mailContent).subscribe({
      next: (response) => {
        if (!environment.production) {
          console.log('Email envoyé avec succès: ', response);
        }
      },
      error: (error) => {
        if (!environment.production) {
          console.error("Erreur lors de l'envoi de l'email: ", error);
        }
      },
    });
  }

  getRoleLabel(role: string): string {
    return ROLE_LABELS[role] || role;
  }

  updateEmailValidator() {
    const emailControl = this.sqlFormComponent.form.get('userEmail');
    if (emailControl) {
      const validators = [
        Validators.required,
        Validators.email,
        Validators.maxLength(255),
        CustomValidators.uniqueEmail(this.users),
      ];
      emailControl.setValidators(validators);
      emailControl.updateValueAndValidity();
    }
  }

  getChangedFields(user: User): Partial<User> {
    const changedFields: any = {};
    (Object.keys(user) as (keyof User)[]).forEach((key) => {
      if (user[key] !== this.initialFormValues[key]) {
        changedFields[key] = user[key] as User[keyof User];
      }
    });
    return changedFields;
  }
}
