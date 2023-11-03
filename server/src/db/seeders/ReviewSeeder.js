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
      },
      {
        movieId: fiveNights.id,
        userId: ej.id,
        content: "too scary",
      },
      {
        movieId: theExorcist.id,
        userId: tyler.id,
        content: "love love this",
      },
      {
        movieId: theExorcist.id,
        userId: sky.id,
        content: "so boring",
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
