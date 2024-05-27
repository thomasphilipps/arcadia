export interface Review {
  reviewId: number;
  reviewAlias: string;
  reviewContent: string;
  reviewRating: number;
  reviewPostedOn: Date;
  reviewApproved: boolean;
  reviewApprovedBy: string | null;
  approvedBy: string | null;
}
