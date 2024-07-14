import { Image } from './image.interface';
import { VetReport } from './report.interface';

export interface Animal {
  animalId: string;
  animalName: string;
  animalDescr: string;
  animalBirth: Date;
  animalGender: 'Mâle' | 'Femelle';
  biomeKey: number;
  specieKey: number;
  animalSpecie: string;
  animalBiome: string;
  images?: Image[];
  reports?: VetReport[];
}
