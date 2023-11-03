import React from "react";
import ReviewTile from "./ReviewTile";

const ReviewList = (props) => {
  const reviewTiles = props.movie.reviews.map((review) => {
    return (
      <ReviewTile
        key={review.id}
        review={review}
        user={props.user}
        movie={props.movie}
        setMovie={props.setMovie}
      />
    );
  });

  return <ul>{reviewTiles}</ul>;
};

export default ReviewList;
