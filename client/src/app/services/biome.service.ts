import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Biome } from '@app/interfaces/biome.interface';
import { environment } from '@environments/environment.development';
import { SqlGlobalService } from './sql-global.service';

@Injectable({
  providedIn: 'root',
})
export class BiomeService extends SqlGlobalService<Biome> {
  constructor(http: HttpClient) {
    super(http, environment.apiURL + '/biomes');
  }
}
