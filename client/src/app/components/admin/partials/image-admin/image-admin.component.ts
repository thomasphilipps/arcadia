import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageManagerComponent } from '@app/components/templates/image-manager/image-manager.component';
import { Image } from '@app/interfaces/image.interface';

@Component({
  selector: 'arz-image-admin',
  standalone: true,
  imports: [CommonModule, ImageManagerComponent],
  templateUrl: './image-admin.component.html',
  styleUrl: './image-admin.component.scss',
})
export class ImageAdminComponent {
  imageConfig: Image = {
    referenceType: 'Biome',
    referenceId: '3',
  };
}
