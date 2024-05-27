export interface Report {
  reportId: number;
  reportState: string;
  reportDate: Date;
  reportDetails: string | null;
  reportFoodType: string | null;
  reportFoodAmount: string | null;
  animalKey: string;
  veterinaryKey: string;
  reportedBy: string;
}
