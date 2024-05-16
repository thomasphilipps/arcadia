import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SqlDataTableComponent } from '../templates/sql-data-table/sql-data-table.component';
import { SqlFormComponent } from '../templates/sql-form/sql-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User } from '@app/interfaces/user.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'arz-user-admin',
  standalone: true,
  imports: [CommonModule, SqlDataTableComponent, SqlFormComponent, MatIconModule, MatButtonModule],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.scss',
})
export class UserAdminComponent implements OnInit {
  users: User[] = [];
  userConfig: SqlViewDataConfig<User>;

  editingUserId: string | null = null;
  initialFormValues: Partial<User> = {};

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<User>;

  constructor(private userService: UserService) {
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
    };
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
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

  addUser(): void {}

  viewUser(userId: string): void {
    console.log(`Affichage de l'utilisateur : ${userId}`);
  }

  deleteUser(userId: string) {
    console.log(`Suppression de l'utilisateur : ${userId}`);
  }
}
