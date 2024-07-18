import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@app/app.config';
import { Image } from '@app/interfaces/image.interface';
import { environment } from '@environments/environment';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  protected apiURL: string;

  images: Image[] = [];

  constructor(protected http: HttpClient, @Inject(API_URL) apiURL: string) {
    this.apiURL = apiURL;
  }

  uploadImage(image: Image, file: File): Observable<Image> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('referenceId', image.referenceId);
    formData.append('referenceType', image.referenceType);
    formData.append('description', image.imageDescription ?? '');

    return this.http.post<Image>(`${this.apiURL}/image/upload`, formData).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  // Get all images for a <T> Id based on the referenceType (Animal, Biome, Specie or Service)
  getImageByReferenceTypeAndId(referenceType: string, referenceId: string): Observable<Image[]> {
    return this.http
      .get<Image[]>(`${this.apiURL}/image/type/${referenceType}/id/${referenceId}`)
      .pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, []))
      );
  }

  getImagesByReferenceType(referenceType: string): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiURL}/image/type/${referenceType}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete<Image>(`${this.apiURL}/image/${imageId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  protected log(response: any) {
    if (!environment.production) {
      console.table(response);
    }
  }

  protected handleError(error: any, errorValue: [] | any) {
    if (!environment.production) {
      console.error(error);
    }
    return of(errorValue);
  }
}
