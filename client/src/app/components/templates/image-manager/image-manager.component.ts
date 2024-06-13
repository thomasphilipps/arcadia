// src/app/components/image-manager/image-manager.component.ts
import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageService } from '@services/image.service';
import { Image } from '@app/interfaces/image.interface';

@Component({
  selector: 'arz-image-manager',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss'],
})
export class ImageManagerComponent implements OnChanges {
  private _imageConfig: Image | undefined;

  @Input() set imageConfig(value: Image) {
    this._imageConfig = value;
    this.referenceType = value.referenceType;
    this.referenceId = value.referenceId;
    this.loadImages();
  }

  get imageConfig(): Image {
    return this._imageConfig!;
  }

  referenceType!: string;
  referenceId!: string;

  images = signal<any[]>([]);
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  loading = signal(false);

  constructor(private imageService: ImageService, private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      description: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageConfig'] && this._imageConfig) {
      this.loadImages();
    }
  }

  loadImages(): void {
    if (this.referenceType && this.referenceId) {
      this.imageService.getImages(this.referenceType, this.referenceId).subscribe((images) => {
        this.images.set(images);
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (this.selectedFile) {
      const description = this.uploadForm.get('description')?.value || '';
      this.loading.set(true);
      console.log(this.selectedFile);
      this.imageService
        .uploadImage(this.selectedFile, this.referenceId, this.referenceType, description)
        .subscribe(
          () => {
            this.loadImages();
            this.selectedFile = null;
            this.uploadForm.reset();
            this.loading.set(false);
          },
          () => {
            this.loading.set(false);
          }
        );
    }
  }

  deleteImage(imageId: string): void {
    this.loading.set(true);
    this.imageService.deleteImage(imageId).subscribe(
      () => {
        this.loadImages();
        this.loading.set(false);
      },
      () => {
        this.loading.set(false);
      }
    );
  }
}
