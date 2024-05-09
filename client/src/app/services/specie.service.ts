import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specie } from '@app/interfaces/specie.interface';
import { environment } from '@environments/environment.development';
import { SqlGlobalService } from './sql-global.service';
import { Observable, catchError, map } from 'rxjs';
import { Biome } from '@app/interfaces/biome.interface';
import { OptionArray } from '@app/interfaces/sqlViewDataConfig.interface';

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
}
