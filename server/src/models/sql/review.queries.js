const reviewReadAllQuery = () => {
  return `
  SELECT
    Reviews.*,
    Users.userName as approvedBy
  FROM Reviews
  LEFT JOIN Users ON Reviews.reviewApprovedBy = Users.userId`;
};

const reviewReadByIdQuery = (id) => {
  return `
  SELECT
    Reviews.*,
    Users.userName as approvedBy
  FROM Reviews
  LEFT JOIN Users ON Reviews.reviewApprovedBy = Users.userId WHERE reviewId = ${id}`;
};

module.exports = {
  reviewReadAllQuery,
  reviewReadByIdQuery,
};
