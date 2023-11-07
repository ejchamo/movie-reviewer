import ReviewSerializer from "./ReviewSerializer.js";

class MovieSerializer {
  static async getDetails(movies) {
    const allowedAttributes = ["id", "title"];

    const serializedMovies = await Promise.all(
      movies.map(async (movie) => {
        let serializedMovie = {};
        for (const attribute of allowedAttributes) {
          serializedMovie[attribute] = movie[attribute];
        }

        let averageRating = await movie.getAverage();
        serializedMovie.averageRating = averageRating;

        return serializedMovie;
      })
    );

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

    let averageRating = await movie.getAverage();
    serializedMovie.averageRating = averageRating;

    return serializedMovie;
  }
}

export default MovieSerializer;
