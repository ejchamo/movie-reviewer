import React, { useState } from "react";
import EditReviewForm from "./EditReviewForm";
import deleteReview from "../services/DeleteReview";

const ReviewTile = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  let editForm;

  const editButtonOnClick = () => {
    setIsClicked((current) => !current);
  };

  if (isClicked === true) {
    editForm = (
      <EditReviewForm
        review={props.review}
        user={props.user}
        movie={props.movie}
        setIsClicked={setIsClicked}
        setMovie={props.setMovie}
      />
    );
  }

  let editButton;
  if (props.user && props.review.userId === props.user.id) {
    editButton = <input type="submit" onClick={editButtonOnClick} value="Edit" />;
    
  const deleteOnClick = async () => {
    const response = await deleteReview(props.review.id);

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
      {editButton}
      {editForm}
      {deleteButton}
    </li>
  );
};

export default ReviewTile;
