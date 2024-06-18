import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'arz-not-found',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <h1>404</h1>
      <h2>Page introuvable</h2>
      <p>Désolé, cette page n'existe pas</p>
      <p>Vous allez être redirigé vers l'accueil dans 3 secondes</p>
    </div>
  `,
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
}
