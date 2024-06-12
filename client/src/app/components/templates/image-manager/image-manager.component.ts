import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageService } from '@services/image.service';
import { BehaviorSubject } from 'rxjs';
import { Image } from '@app/interfaces/image.interface';

@Component({
  selector: 'arz-image-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.css'],
})
export class ImageManagerComponent implements OnChanges {
  @Input() imageConfig!: Image;
  referenceType = this.imageConfig.referenceType;
  referenceId = this.imageConfig.referenceId;

  images$ = new BehaviorSubject<any[]>([]);
  description = '';
  selectedFile: File | null = null;

  constructor(private imageService: ImageService) {}

  ngOnChanges(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.imageService.getImages(this.referenceType, this.referenceId).subscribe((images) => {
      this.images$.next(images);
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.imageService
        .uploadImage(this.selectedFile, this.referenceId, this.referenceType, this.description)
        .subscribe(() => {
          this.loadImages();
          this.selectedFile = null;
          this.description = '';
        });
    }
  }

  deleteImage(imageId: string): void {
    this.imageService.deleteImage(imageId).subscribe(() => {
      this.loadImages();
    });
  }
}
