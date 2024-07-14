import { Component, Inject, Input } from '@angular/core';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { Image } from '@app/interfaces/image.interface';

@Component({
  selector: 'arz-image-gallery',
  standalone: true,
  imports: [],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss',
})
export class ImageGalleryComponent {
  @Input() images: Image[];

  constructor(public dialog: MatDialog) {}

  openImage(image: string | undefined): void {
    if (!image) {
      return;
    }
    this.dialog.open(ImageDialogComponent, {
      data: { image },
    });
  }

  getThumbnailName(path: string | undefined): string {
    if (!path) {
      return 'assets/images/blank-image.png'; // Ou une URL par défaut de l'image de miniature
    }
    const parts = path.split('/');
    const filename = parts.pop();
    const thumbnailFilename = `thumbnail-${filename}`;
    parts.push(thumbnailFilename);
    return parts.join('/');
  }
}

@Component({
  selector: 'app-image-dialog',
  standalone: true,
  template: `
    <div class="image-dialog">
      <img [src]="data.image" alt="Full Image" />
    </div>
  `,
  styles: [
    `
      .image-dialog {
        text-align: center;
      }
      .image-dialog img {
        max-width: 100%;
        height: auto;
      }
    `,
  ],
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { image: string }) {}
}
