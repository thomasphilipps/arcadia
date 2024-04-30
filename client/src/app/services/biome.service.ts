import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Biome } from '@app/interfaces/biome.interface';
import { environment } from '@environments/environment.development';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BiomeService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  public getAllBiomes(): Observable<Biome[]> {
    return this.http.get<Biome[]>(`${this.apiURL}/biomes`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  public addBiome(biome: Biome): Observable<Biome> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    let { biomeId, ...biomeInfo } = biome;

    return this.http.post<Biome>(`${this.apiURL}/biomes`, biomeInfo, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  public updateBiome(biomeId: number, biome: Biome): Observable<Biome> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put<Biome>(`${this.apiURL}/biomes/${biomeId}`, biome, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  public deleteBiome(biomeId: number): Observable<Biome> {
    return this.http.delete<Biome>(`${this.apiURL}/biomes/${biomeId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  private log(response: any) {
    if (!environment.production) {
      console.table(response);
    }
  }

  private handleError(error: Error, errorValue: [] | any) {
    if (!environment.production) {
      console.error(error);
    }
    return of(errorValue);
  }
}
