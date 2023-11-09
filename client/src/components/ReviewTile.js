import React, { useState } from "react";
import EditReviewForm from "./EditReviewForm";
import deleteReview from "../services/DeleteReview";
import VotingButtons from "./VotingButtons";

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
  let deleteButton;
  if (props.user && props.review.userId === props.user.id) {
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
    editButton = (
      <input className="edit-del-button" type="submit" onClick={editButtonOnClick} value="Edit" />
    );
    deleteButton = (
      <input className="edit-del-button" type="submit" onClick={deleteOnClick} value="Delete" />
    );
  }

  return (
    <div className="review-container">
      <li className="review">
        <h5>{props.review.username}</h5>
        {editForm}
        {props.review.content}
        <div className="review-rating-score">Rating: {props.review.rating}</div>
      </li>
      <div className="review-buttons-container">
        <div className="edit-del-button">{editButton}</div>
        <div className="edit-del-button">{deleteButton}</div>
        <VotingButtons review={props.review} />
      </div>
    </div>
  );
};

export default ReviewTile;
