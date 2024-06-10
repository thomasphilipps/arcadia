import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Image } from '@app/interfaces/image.interface';
import { ImageService } from '@app/services/image.service';

@Component({
  selector: 'arz-image-manager',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './image-manager.component.html',
  styleUrl: './image-manager.component.scss',
})
export class ImageManagerComponent<T> implements OnInit {
  selectedFile: Signal<File | null> = signal(null);
  images: Signal<Image[]> = signal([]);

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {}

  onUploadImage(): void {}

  onDeleteImage(imageId: string): void {}
}
