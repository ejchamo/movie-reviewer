import React, { useState } from "react";

import EditReviewForm from "./EditReviewForm";

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
        reviews={props.reviews}
        setMovie={props.setMovie}
      />
    );
  }

  let editButton;
  if (props.user && props.review.userId === props.user.id) {
    editButton = <input type="submit" onClick={editButtonOnClick} value="Edit" />;
  }

  return (
    <li>
      {props.review.content}
      {"  "}
      {editButton}
      {editForm}
    </li>
  );
};

export default ReviewTile;
