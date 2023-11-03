import React from "react";
import deleteReview from "../services/DeleteReview";

const ReviewTile = (props) => {
  const deleteOnClick = async () => {
    const response = await deleteReview(props.user.id, props.review.id, props.review.userId);

    if (response.status === 200) {
      const newReviews = props.movie.reviews.filter((review) => {
        return review.id !== props.review.id;
      });

      const newMovie = { ...props.movie, reviews: newReviews };
      props.setMovie(newMovie);
    }
  };

  let deleteButton;
  if (props.user && props.review.userId === props.user.id) {
    deleteButton = <input type="submit" onClick={deleteOnClick} value="Delete" />;
  }

  return (
    <li>
      {props.review.content}
      {deleteButton}
    </li>
  );
};

export default ReviewTile;
