import React, { useState, useEffect } from "react";
import ReviewList from "./ReviewList";
import { Link } from "react-router-dom";
import getMovie from "../services/getMovie.js";

const MovieShow = (props) => {
  const [movie, setMovie] = useState({
    title: "",
    reviews: [],
  });

  const movieId = props.match.params.id;

  useEffect(() => {
    getMovie(movieId).then((parseMovieData) => {
      setMovie(parseMovieData);
    });
  }, []);

  let newReviewFormLink;
  if (props.user) {
    newReviewFormLink = (
      <Link to={`/movies/${props.match.params.id}/reviewForm`}>Add a new review here!</Link>
    );
  }

  return (
    <>
      <h1>{movie.title}</h1>
      <div>Average Rating: {movie.averageRating}</div>
      {newReviewFormLink}
      <ReviewList user={props.user} movie={movie} setMovie={setMovie} />
    </>
  );
};

export default MovieShow;
