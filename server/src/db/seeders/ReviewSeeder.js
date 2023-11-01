import { Review } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {
    const reviewsData = [
      {
        movieId: 1,
        userId: 1,
        review: "soy good",
      },
      {
        movieId: 2,
        userId: 2,
        review: "too scary",
      },
      {
        movieId: 3,
        userId: 1,
        review: "love love this",
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
