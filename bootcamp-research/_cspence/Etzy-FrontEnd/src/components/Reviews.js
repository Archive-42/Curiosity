import { ButtonGroup, Button } from '@material-ui/core';
import React, { useState } from 'react';
import ReviewList from './ReviewList';

const Reviews = ({ productReviews, shopReviews }) => {
  const [ showProductReviews, setShowProductReviews ] = useState(false);
  return (
    <>
      <ButtonGroup
        variant="text"
        color="primary">
        <Button color="primary" onClick={() => setShowProductReviews(true)}>
          Product Reviews ({productReviews.length})
        </Button>
        <Button color="primary" onClick={() => setShowProductReviews(false)}>
          Shop Reviews ({shopReviews.length})
        </Button>
      </ButtonGroup>
      {
        showProductReviews ?
          <ReviewList reviews={productReviews} /> :
          <ReviewList reviews={shopReviews} />
      }
    </>
  );
};

export default Reviews;