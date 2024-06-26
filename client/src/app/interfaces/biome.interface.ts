import { Image } from './image.interface';

export interface Biome {
  biomeId: number;
  biomeName: string;
  biomeShortDescr: string;
  biomeLongDescr: string;
  biomeStatus: string | null;
  images?: Image[];
}
