import React from "react";
import deleteReview from "../services/DeleteReview";

const ReviewTile = (props) => {
  const deleteOnClick = () => {
    deleteReview(props.user.id, props.review.id);
  };

  return (
    <li>
      {props.review.content}
      <input type="submit" onClick={deleteOnClick} value="Delete" />
    </li>
  );
};

export default ReviewTile;
