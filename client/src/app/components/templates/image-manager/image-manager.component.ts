import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Image } from '@app/interfaces/image.interface';
import { ImageService } from '@app/services/image.service';

@Component({
  selector: 'arz-image-manager',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './image-manager.component.html',
  styleUrl: './image-manager.component.scss',
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

  images: Image[] = [];
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  loading = false;

  constructor(private imageService: ImageService, private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      description: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['referenceType'] || changes['referenceId']) {
      this.loadImages();
    }
  }

  loadImages(): void {
    if (this.referenceType && this.referenceId) {
      this.imageService
        .getImageByReferenceTypeAndId(this.referenceType, this.referenceId)
        .subscribe((images) => {
          this.images = images;
        });
    }
  }

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.selectedFile = file;
  }

  uploadImage(): void {
    if (this.selectedFile) {
      const description = this.uploadForm.get('description')?.value || '';
      this.loading = true;
      console.log('Uploading file:', this.selectedFile);
      const image = {
        referenceId: this.referenceId,
        referenceType: this.referenceType,
        imageDescription: description,
      } as Image;

      this.imageService.uploadImage(image, this.selectedFile).subscribe({
        next: (response) => {
          this.loadImages();
          this.selectedFile = null;
          this.uploadForm.reset();
          this.loading = false;
        },
        error: (err) => {
          console.log('Upload failed', err);
          this.loading = false;
        },
      });
    }
  }

  deleteImage(imageId: string): void {
    this.loading = true;
    this.imageService.deleteImage(imageId).subscribe({
      next: () => {
        this.loadImages();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
