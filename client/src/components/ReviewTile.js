import React from "react";
import deleteReview from "../services/DeleteReview";

const ReviewTile = (props) => {
  const deleteOnClick = async () => {
    console.log(props.movie);
    const response = await deleteReview(props.user.id, props.review.id);

    if (response.status === 200) {
      const newReviews = props.movie.reviews.filter((review) => {
        return review.id !== props.review.id;
      });

      const newMovie = { ...props.movie, reviews: newReviews };
      props.setMovie(newMovie);
    }
  };

  return (
    <li>
      {props.review.content}
      <input type="submit" onClick={deleteOnClick} value="Delete" />
    </li>
  );
};

export default ReviewTile;
