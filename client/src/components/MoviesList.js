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
      <div className="cell">
        <div className="radius bordered shadow card" key={movieItem.id}>
          <div className="card-section">
            <Link className="movie-title" to={`/movies/${movieItem.id}`}>
              {movieItem.title}
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1>Latest Movies</h1>
      <div className="grid-container">
        <div className="grid-x grid-padding-x small-up-2 medium-up-4 large-up-6">
          {moviesListItems}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
