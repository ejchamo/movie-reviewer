const getMovie = async (movieId) => {
  try {
    const response = await fetch(`/api/v1/movies/${movieId}`);
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessage);
      throw error;
    }
    const body = await response.json();

    return body.movie;
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`);
  }
};

export default getMovie;
