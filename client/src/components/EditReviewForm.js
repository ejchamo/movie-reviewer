import React, { useState } from "react";

const EditReviewForm = (props) => {
  const [review, setReview] = useState({});

  const editOnClick = () => {
    return console.log("clicked");
  };

  return (
    <form>
      <h1>Update Review</h1>
      <label htmlFor="">
        <input type="text" placeholder="Please enter your review"></input>
      </label>
      <input type="submit" onClick={editOnClick}></input>
    </form>
  );
};

export default EditReviewForm;
