import { Animal } from './animal.interface';
import { Image } from './image.interface';

export interface Specie {
  specieId: number;
  specieName: string;
  specieTaxon: string;
  specieDescr: string;
  biomeKey: number;
  specieBiome: string;
  images?: Image[];
  animals?: Animal[];
}
