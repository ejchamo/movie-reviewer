import React from "react";
import { Link } from "react-router-dom";

const MovieTile = ({ movieItem }) => {
  return (
    <div className="cell">
      <div
        className="radius bordered shadow card"
        key={movieItem.id}
        style={{ backgroundImage: `url(${movieItem.imageUrl})` }}
      >
        <Link to={`/movies/${movieItem.id}`}>
          <div className="card-section">
            <div className="movie-title">{movieItem.title}</div>
            {movieItem.averageRating == "NaN" ? (
              ""
            ) : (
              <div className="movie-rating">Rating: {movieItem.averageRating}</div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MovieTile;
