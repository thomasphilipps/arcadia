export interface Feeding {
  feedingId: number;
  feedingType: string;
  feedingAmount: string;
  feedingDate: Date;
  feedingBy: string;
  reportKey: number;
  animalKey: string;
  feederName: string;
  animalName: string;
  animalBiome: string;
  animalSpecie: string;
}

export const defaultFeeding: Partial<Feeding> = {
  feedingType: '',
  feedingAmount: '',
};
