import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map } from 'rxjs';

import { SqlGlobalService } from './sql-global.service';
import { Animal } from '@app/interfaces/animal.interface';
import { environment } from '@environments/environment.development';
import { OptionArray } from '@app/interfaces/sqlViewDataConfig.interface';
import { Biome } from '@app/interfaces/biome.interface';
import { Specie } from '@app/interfaces/specie.interface';

@Injectable({
  providedIn: 'root',
})
export class AnimalService extends SqlGlobalService<Animal> {
  constructor(http: HttpClient) {
    super(http, environment.apiURL + '/animals');
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

  getSpeciesByBiomeId(biomeId: number): Observable<OptionArray[]> {
    return this.http.get<Specie[]>(`${environment.apiURL}/biomes/${biomeId}/species`).pipe(
      map((response) => {
        return response.map((specie) => {
          return { idValue: specie.specieId, label: specie.specieName };
        });
      }),
      catchError((error) => this.handleError(error, []))
    );
  }

  getAnimalById(animalId: string): Observable<Animal> {
    return this.http
      .get<Animal>(`${environment.apiURL}/animals/${animalId}`)
      .pipe(catchError((error) => this.handleError(error, null)));
  }
}
