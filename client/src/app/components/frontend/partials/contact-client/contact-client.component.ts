import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'arz-contact-client',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './contact-client.component.html',
  styleUrl: './contact-client.component.scss',
})
export class ContactClientComponent {}
