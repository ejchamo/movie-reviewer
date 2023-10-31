import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const NewMovieForm = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
  });

  const postMovie = async (newMovieData) => {
    try {
      const response = await fetch(`/api/v1/movies`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newMovieData),
      });

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      } else {
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  if (shouldRedirect) {
    return <Redirect push to="/" />;
  }

  const handleInputChange = (event) => {
    setNewMovie({
      ...newMovie,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postMovie(newMovie);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Movie</h2>

      <label>
        Movie Title:
        <input type="text" name="title" onChange={handleInputChange} value={newMovie.title} />
      </label>

      <div className="button-group">
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default NewMovieForm;
