import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Image } from '@app/interfaces/image.interface';
import { ImageManager } from '@app/interfaces/sqlViewDataConfig.interface';
import { ImageService } from '@app/services/image.service';

@Component({
  selector: 'arz-image-manager',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss'],
})
export class ImageManagerComponent<T> implements OnInit {
  selectedFile: File | null = null;
  //uploadProgress: number = 0;
  images: Image[] = [];

  @Output() imageUploaded = new EventEmitter<string>();

  @Input() imageConf?: ImageManager;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    if (this.imageConf) {
      this.imageService
        .getImageByReferenceTypeAndId(this.imageConf.referenceType, this.imageConf.referenceId)
        .subscribe({
          next: (images) => {
            this.images = images;
          },
          error: (err) => {
            console.error('Error loading images', err);
          },
        });
    }
  }

  onFileSelected(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.selectedFile = file;
  }

  onUploadImage() {
    if (!this.selectedFile || !this.imageConf) {
      console.error('No file selected or image configuration missing.');
      return;
    }

    const image = {
      imageDescription: this.imageConf.imageDescription,
      referenceId: this.imageConf.referenceId,
      referenceType: this.imageConf.referenceType,
    };

    this.imageService.uploadImage(image, this.selectedFile).subscribe({
      next: (response) => {
        console.log('Upload successful', response);
        this.imageUploaded.emit(response.imagePath);
        this.images.push(response);
        this.selectedFile = null;
        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
      },
      error: (err) => {
        console.error('Upload failed', err);
      },
    });
  }

  onDeleteImage(imageId: string) {
    this.imageService.deleteImage(imageId).subscribe({
      next: (response) => {
        console.log('Image deleted', response);
        this.images = this.images.filter((image) => image.imageId !== imageId);
      },
      error: (err) => {
        console.error('Error deleting image', err);
      },
    });
  }

  getThumbnailName(path: string | undefined): string {
    if (!path) {
      return 'assets/images/blank-image.png';
    }
    const parts = path.split('/');
    const filename = parts.pop();
    const thumbnailFilename = `thumbnail-${filename}`;
    parts.push(thumbnailFilename);
    return parts.join('/');
  }
}
