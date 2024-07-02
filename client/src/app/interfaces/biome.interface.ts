import { Image } from './image.interface';
import { Specie } from './specie.interface';

export interface Biome {
  biomeId: number;
  biomeName: string;
  biomeShortDescr: string;
  biomeLongDescr: string;
  biomeStatus: string | null;
  images?: Image[];
  species?: Specie[];
}
