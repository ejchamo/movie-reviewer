import ReviewSerializer from "./ReviewSerializer.js";

class MovieSerializer {
  static async getDetails(movies) {
    const allowedAttributes = ["id", "title", "imageUrl"];

    const serializedMovies = await Promise.all(
      movies.map(async (movie) => {
        let serializedMovie = {};
        for (const attribute of allowedAttributes) {
          serializedMovie[attribute] = movie[attribute];
        }

        const averageRating = await movie.getAverage();
        serializedMovie.averageRating = averageRating;

        return serializedMovie;
      })
    );

    return serializedMovies;
  }

  static async getSummary(movie) {
    const allowedAttributes = ["id", "title", "imageUrl"];
    const serializedMovie = {};
    for (const attribute of allowedAttributes) {
      serializedMovie[attribute] = movie[attribute];
    }

    let reviews = await movie.$relatedQuery("reviews");

    const serializedReviews = await Promise.all(
      reviews.map(async (review) => {
        return await ReviewSerializer.cleanReview(review);
      })
    );
    serializedMovie.reviews = serializedReviews;

    const averageRating = await movie.getAverage();
    serializedMovie.averageRating = averageRating;

    return serializedMovie;
  }
}

export default MovieSerializer;
