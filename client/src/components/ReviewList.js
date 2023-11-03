import React from "react";
import ReviewTile from "./ReviewTile";

const ReviewList = (props) => {
  const reviewTiles = props.reviews.map((review) => {
    return <ReviewTile key={review.id} review={review} user={props.user} />;
  });

  return <ul>{reviewTiles}</ul>;
};

export default ReviewList;
