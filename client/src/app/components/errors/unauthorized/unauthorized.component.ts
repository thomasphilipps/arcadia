import { Component } from '@angular/core';

@Component({
  selector: 'arz-unauthorized',
  standalone: true,
  imports: [],
  template: `
    <h1>403 - Accès interdit</h1>
    <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
  `,
  styleUrl: './unauthorized.component.scss',
})
export class UnauthorizedComponent {}
