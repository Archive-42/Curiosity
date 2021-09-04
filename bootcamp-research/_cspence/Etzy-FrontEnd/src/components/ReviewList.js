import React from 'react';

const ReviewList = ({ reviews }) => {
  if (!reviews.length) return null;
  return (
    <>{reviews.map(review => (
      review.Reviews ?
        review.Reviews.map(rev => (
          <p>{rev.reviewBody}</p>
        )) :
        <p>{review.reviewBody}</p>
    ))
    }</>
  );

};

export default ReviewList;