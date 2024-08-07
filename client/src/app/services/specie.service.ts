import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specie } from '@app/interfaces/specie.interface';
import { environment } from '@environments/environment';
import { SqlGlobalService } from './sql-global.service';
import { Observable, catchError, map } from 'rxjs';
import { Biome } from '@app/interfaces/biome.interface';
import { OptionArray } from '@app/interfaces/sqlViewDataConfig.interface';
import { Animal } from '@app/interfaces/animal.interface';

@Injectable({
  providedIn: 'root',
})
export class SpecieService extends SqlGlobalService<Specie> {
  constructor(http: HttpClient) {
    super(http, environment.apiURL + '/species');
  }

  getBiomeOptions(): Observable<OptionArray[]> {
    return this.http.get<Biome[]>(environment.apiURL + '/biomes').pipe(
      map((response) => {
        return response.map((biome) => {
          return { idValue: biome.biomeId, label: biome.biomeName };
        });
      }),
      catchError((error) => this.handleError(error, []))
    );
  }

  getAnimalsBySpecieId(specieId: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${environment.apiURL}/species/${specieId}/animals`).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => this.handleError(error, []))
    );
  }
}
