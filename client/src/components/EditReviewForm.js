import React, { useState } from "react";
import editReview from "../services/editReview";

const EditReviewForm = (props) => {
  const [content, setContent] = useState({ content: props.review.content });
  const handleInputChange = (event) => {
    setContent({
      ...content,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const editOnClick = async (event) => {
    event.preventDefault();
    const updateReview = await editReview(props.review.id, props.user.id, content)
    const reviewObject = {
      id: updateReview.updatedReview.id,
      content: updateReview.updatedReview.content,
      userId: updateReview.updatedReview.userId,
    };
    const reviewList = props.movie.reviews;
    const index = reviewList.findIndex((review) => review.id === props.review.id);
    const splicedReview = reviewList.toSpliced(index, 1, reviewObject);
    props.setMovie({ title: props.movie.title, reviews: splicedReview });
    props.setIsClicked(false);
  };

  return (
    <form onSubmit={editOnClick}>
      <h1>Update Review</h1>
      <label htmlFor="">
        <input
          type="text"
          name="content"
          placeholder="Please enter your review"
          value={content.content}
          onChange={handleInputChange}
        ></input>
      </label>
      <input type="submit" value="Submit"></input>
    </form>
  );
};

export default EditReviewForm;
