import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'arz-landing-client',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './landing-client.component.html',
  styleUrl: './landing-client.component.scss',
})
export class LandingClientComponent {}
