import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";
import getMovie from "../services/getMovie";

const NewReviewForm = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState([]);
  const [newReview, setNewReview] = useState({
    content: "",
    rating: "",
  });
  const [movie, setMovie] = useState({
    title: "",
    reviews: [],
  });

  const user = props.user;

  const movieId = props.computedMatch.params.id;

  useEffect(() => {
    getMovie(movieId).then((parseMovieData) => {
      setMovie(parseMovieData);
    });
  }, []);

  const postReview = async (newReview) => {
    try {
      const response = await fetch(`/api/v1/movies/${movieId}/reviewForm`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ ...newReview }),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json();
          const newErrors = translateServerErrors(errorBody.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  if (shouldRedirect) {
    return <Redirect push to={`/movies/${movieId}`} />;
  }

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postReview(newReview);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a New Review for {movie.title}</h1>
      <ErrorList errors={errors} />
      <h5>{user.email}</h5>
      <label>
        Enter your review:
        <input
          className="review-content"
          type="text"
          name="content"
          onChange={handleInputChange}
          value={newReview.content}
        />
      </label>

      <label>
        Enter your rating (1-10):
        <div>
          <input
            type="number"
            name="rating"
            onChange={handleInputChange}
            className="ratings"
            min={1}
            max={10}
          ></input>
        </div>
      </label>

      <input className="button" type="submit" value="Submit" />
    </form>
  );
};

export default NewReviewForm;
