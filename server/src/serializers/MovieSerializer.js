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

        let averageRating = await movie.$relatedQuery("reviews").avg("rating");
        serializedMovie.averageRating = parseFloat(averageRating[0].avg).toFixed(1);

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

    let averageRating = await movie.$relatedQuery("reviews").avg("rating");
    serializedMovie.averageRating = parseFloat(averageRating[0].avg).toFixed(1);

    return serializedMovie;
  }
}

export default MovieSerializer;
