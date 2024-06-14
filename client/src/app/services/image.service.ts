import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { API_URL } from '@app/app.config';
import { Image } from '@app/interfaces/image.interface';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  protected apiUrl: string;

  constructor(protected http: HttpClient, @Inject(API_URL) apiURL: string) {
    this.apiUrl = apiURL;
  }

  uploadImage(image: Image, file: File): Observable<Image> {
    console.log('uploadImage', image, file);
    const formData: FormData = new FormData();
    formData.append('image', file);
    formData.append('referenceId', image.referenceId);
    formData.append('referenceType', image.referenceType);
    formData.append('description', image.imageDescription || '');
    console.log('formData', formData);
    return this.http.post<Image>(`${this.apiUrl}/image/upload`, formData).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getImages(referenceType: string, referenceId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/image/type/${referenceType}/id/${referenceId}`);
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/image/${imageId}`);
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
