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
      <div className="grid-container">
        <div className="grid-y medium-grid-frame">
          <div className="medium-cell-block-container">
            <div className="grid-x grid-padding-x">
              <div className="movie-detail-container cell medium-6 medium-cell-block-y">
                <h1>{movie.title}</h1>
              </div>
              <div className="reviews-list-container cell medium-6 medium-cell-block-y">
                {newReviewFormLink}
                <ReviewList user={props.user} movie={movie} setMovie={setMovie} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieShow;
