export interface VetReport {
  reportId: number;
  reportState: string;
  reportDate: Date;
  reportDetails: string | null;
  reportFoodType: string | null;
  reportFoodAmount: string | null;
  animalKey: string;
  veterinaryKey: string;
  reportedBy: string;
  animalBiome: string;
  animalSpecie: string;
  animalName: string;
  animalGender: string;
  animalBirth: Date;
}
