import ReviewSerializer from "./ReviewSerializer.js";

class MovieSerializer {
  static getDetails(movies) {
    const allowedAttributes = ["id", "title"];

    const serializedMovies = movies.map((movie) => {
      let serializedMovie = {};
      for (const attribute of allowedAttributes) {
        serializedMovie[attribute] = movie[attribute];
      }
      return serializedMovie;
    });

    return serializedMovies;
  }

  static async getSummary(movie) {
    const allowedAttributes = ["id", "title"];
    const serializedMovie = {};
    for (const attribute of allowedAttributes) {
      serializedMovie[attribute] = movie[attribute];
    }

    let reviews = await movie.$relatedQuery("reviews");
    const serializedReviews = reviews.map((review) => {
      return ReviewSerializer.cleanReview(review);
    });

    serializedMovie.reviews = serializedReviews;

    return serializedMovie;
  }
}

export default MovieSerializer;
