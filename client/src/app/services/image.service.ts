import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = environment.apiURL + '/image';

  constructor(private http: HttpClient) {}

  uploadImage(
    image: File,
    referenceId: string,
    referenceType: string,
    description?: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('referenceId', referenceId);
    formData.append('referenceType', referenceType);
    if (description) {
      formData.append('description', description);
    }
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getImages(referenceType: string, referenceId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/type/${referenceType}/id/${referenceId}`);
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${imageId}`);
  }
}
