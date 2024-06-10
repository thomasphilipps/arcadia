import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = `${environment.apiURL}/images`;

  constructor(private http: HttpClient) {}

  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image, image.name);
    return this.http.post(this.apiUrl, formData);
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${imageId}`);
  }

  getImagesByReferenceId(referenceId: string, referenceType: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${referenceType}/${referenceId}`);
  }
}
