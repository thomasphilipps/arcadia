import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Biome } from '@app/interfaces/biome.interface';
import { environment } from '@environments/environment.development';
import { SqlGlobalService } from './sql-global.service';
import { Observable, catchError, tap } from 'rxjs';
import { Specie } from '@app/interfaces/specie.interface';

@Injectable({
  providedIn: 'root',
})
export class BiomeService extends SqlGlobalService<Biome> {
  constructor(http: HttpClient) {
    super(http, environment.apiURL + '/biomes');
  }

  getSpeciesByBiomeId(biomeId: number): Observable<Specie[]> {
    return this.http.get<Specie[]>(`${environment.apiURL}/biomes/${biomeId}/species`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }
}
