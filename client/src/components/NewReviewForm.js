import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";

const NewReviewForm = (props) => {
  //   const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState([]);
  const [newReview, setNewReview] = useState({
    content: "",
  });

  const user = props.user;

  //   if (shouldRedirect) {
  //     return <Redirect push to="/" />;
  //   }

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // postReview(newReview);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a New Review</h1>
      <h3>Movie Title</h3>
      <ErrorList errors={errors} />
      <h5>{user.email}</h5>
      <label>
        Enter your review:
        <input type="text" name="content" onChange={handleInputChange} value={newReview.content} />
      </label>

      <input className="button" type="submit" value="Submit" />
    </form>
  );
};

export default NewReviewForm;
