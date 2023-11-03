import React from "react";
import editReview from "../services/editReview";
import { Redirect } from "react-router-dom";

const ReviewTile = (props) => {
  const editOnClick = () => {
    editReview(props.user.id, props.review.id);
  };

  return (
    <li>
      {props.review.content} <input onClick={editOnClick} type="submit" value="Edit" />
    </li>
  );
};

export default ReviewTile;
