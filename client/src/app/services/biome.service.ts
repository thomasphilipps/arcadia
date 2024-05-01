import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Biome } from '@app/interfaces/biome.interface';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';
import { GenericDataService } from './generic-data.service';

@Injectable({
  providedIn: 'root',
})
export class BiomeService extends GenericDataService<Biome> {
  constructor(http: HttpClient) {
    super(http, environment.apiURL + '/biomes');
  }

  public getAllBiomes(): Observable<Biome[]> {
    return this.getAllData();
  }

  public createBiome(biome: Biome): Observable<Biome> {
    return this.createData(biome);
  }

  public updateBiome(biomeId: number, biome: Biome): Observable<Biome> {
    return this.updateData(biomeId, biome);
  }

  public deleteBiome(biomeId: number): Observable<any> {
    return this.deleteData(biomeId);
  }
}
