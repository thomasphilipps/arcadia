export interface Review {
  reviewId: number;
  reviwAlias: string;
  reviwContent: string;
  reviewRating: number;
  reviewPostedOn: Date;
  reviewApproved: boolean;
  reviewApprovedBy: string | null;
}
