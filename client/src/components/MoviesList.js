import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(`/api/v1/movies`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setMovies(body.movies);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const moviesListItems = movies.map((movieItem) => {
    return (
      <li key={movieItem.id}>
        <Link to={`/movies/${movieItem.id}`}>{movieItem.title}</Link>
      </li>
    );
  });

  return (
    <div>
      <h1>Latest Movies</h1>
      <ul>{moviesListItems}</ul>
    </div>
  );
};

export default MoviesList;
