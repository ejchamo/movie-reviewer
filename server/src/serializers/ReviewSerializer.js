class ReviewSerializer {
  static async cleanReview(review) {
    const allowedAttributes = ["id", "content", "userId", "rating"];

    const serializedReview = {};
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute];
    }

    const voteCount = await review.getVoteCount();

    serializedReview.voteCount = voteCount;

    return serializedReview;
  }
}

export default ReviewSerializer;
