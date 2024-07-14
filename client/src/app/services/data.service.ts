import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { ImageService } from '@app/services/image.service';
import { ReportService } from '@app/services/report.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private imageService: ImageService, private reportService: ReportService) {}

  loadData<T>(service: {
    loadData: () => void;
    getAllData: () => Observable<T[]>;
  }): Observable<T[]> {
    service.loadData();
    return service.getAllData();
  }

  loadImages(entityType: string, entities: any[], entityIdKey: string) {
    entities.forEach(async (entity) => {
      try {
        const images = await this.fetchImagesForEntity(entityType, entity[entityIdKey]);
        entity.images = images || [];
      } catch (error) {
        console.error(
          `Erreur lors du chargement des images pour ${entityType} avec ID: ${entity[entityIdKey]}`,
          error
        );
        entity.images = []; // Set to empty array to avoid display issues
      }
    });
  }

  async fetchImagesForEntity(entityType: string, entityId: number | string) {
    try {
      const response = await firstValueFrom(
        this.imageService.getImageByReferenceTypeAndId(entityType, entityId.toString())
      );
      return response;
    } catch (error) {
      console.error(
        `Erreur lors du chargement des images pour ${entityType} avec ID ${entityId}:`,
        error
      );
      return [];
    }
  }
}
