import React, { useState, useEffect } from "react";
import ReviewList from "./ReviewList";

const MovieShow = (props) => {
  const [movie, setMovie] = useState({
    title: "",
    reviews: [],
  });

  const getMovie = async () => {
    const movieId = props.match.params.id;
    try {
      const response = await fetch(`/api/v1/movies/${movieId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();

      setMovie(body.movie);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      <h1>{movie.title}</h1>
      <ReviewList reviews={movie.reviews} />
    </>
  );
};

export default MovieShow;
