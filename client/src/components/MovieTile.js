import React from "react";
import { Link } from "react-router-dom";

const MovieTile = ({ movieItem }) => {
  return (
    <div className="cell">
      <div className="radius bordered shadow card" key={movieItem.id}>
        <div className="card-section">
          <Link className="movie-title" to={`/movies/${movieItem.id}`}>
            {movieItem.title}
          </Link>
          <div>Rating: {movieItem.averageRating}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieTile;
