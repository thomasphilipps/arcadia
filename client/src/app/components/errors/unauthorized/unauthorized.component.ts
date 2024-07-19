import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'arz-unauthorized',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="container has-text-centered">
      <h1>403 - Accès interdit</h1>
      <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
      <p>
        Veuillez vous
        <button mat-raised-button color="primary" (click)="goToLogin()">connecter</button>
        avec un compte autorisé.
      </p>
    </div>
  `,
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['dashboard/login']);
  }
}
