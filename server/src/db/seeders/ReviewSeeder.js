import { Review, Movie, User } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {
    const dune2 = await Movie.query().findOne({ title: "Dune 2" });
    const fiveNights = await Movie.query().findOne({ title: "Five Nights at Freddy's" });
    const theExorcist = await Movie.query().findOne({ title: "The Exorcist" });

    const tyler = await User.query().findOne({ email: "tyler@gmail.com" });
    const sky = await User.query().findOne({ email: "skylfw@launch.com" });
    const ej = await User.query().findOne({ email: "ej@aol.com" });

    const reviewsData = [
      {
        movieId: dune2.id,
        userId: ej.id,
        content: "soy good",
        rating: 10,
      },
      {
        movieId: dune2.id,
        userId: sky.id,
        content: "too dry",
        rating: 4,
      },
      {
        movieId: dune2.id,
        userId: tyler.id,
        content: "love this",
        rating: 8,
      },
      {
        movieId: fiveNights.id,
        userId: ej.id,
        content: "too scary",
        rating: 2,
      },
      {
        movieId: fiveNights.id,
        userId: sky.id,
        content: "so lit",
        rating: 10,
      },
      {
        movieId: fiveNights.id,
        userId: tyler.id,
        content: "amazing",
        rating: 10,
      },
      {
        movieId: theExorcist.id,
        userId: ej.id,
        content: "too scary",
        rating: 1,
      },
      {
        movieId: theExorcist.id,
        userId: sky.id,
        content: "not as good as the original",
        rating: 1,
      },
      {
        movieId: theExorcist.id,
        userId: tyler.id,
        content: "disappointing",
        rating: 1,
      },
    ];

    for (const review of reviewsData) {
      const currentReview = await Review.query().findOne(review);
      if (!currentReview) {
        await Review.query().insert(review);
      }
    }
  }
}

export default ReviewSeeder;
