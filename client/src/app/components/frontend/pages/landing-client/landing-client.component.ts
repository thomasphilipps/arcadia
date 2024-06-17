import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'arz-landing-client',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './landing-client.component.html',
  styleUrl: './landing-client.component.scss',
})
export class LandingClientComponent {}
