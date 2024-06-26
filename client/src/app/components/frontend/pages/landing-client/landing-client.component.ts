import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../partials/footer/footer.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'arz-landing-client',
  standalone: true,
  imports: [
    RouterOutlet,
    MatMenuModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    FooterComponent,
  ],
  templateUrl: './landing-client.component.html',
  styleUrl: './landing-client.component.scss',
})
export class LandingClientComponent {
  scrolled = false;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.scrolled = window.scrollY > 100;
  }
}
