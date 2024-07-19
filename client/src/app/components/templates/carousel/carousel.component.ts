import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'arz-carousel',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  images = [
    { path: 'assets/images/carousel1.jpg', text: 'Image 1' },
    { path: 'src/assets/images/carousel2.jpg', text: 'Image 2' },
    { path: 'src/assets/images/carousel3.jpg', text: 'Image 3' },
  ];

  currentIndex = 0;

  previous() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
  }

  next() {
    this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
  }
}
