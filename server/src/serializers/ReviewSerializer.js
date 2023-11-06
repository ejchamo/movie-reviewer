class ReviewSerializer {
  static cleanReview(review) {
    const allowedAttributes = ["id", "content", "userId", "rating"];

    const serializedReview = {};
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute];
    }
    return serializedReview;
  }
}

export default ReviewSerializer;
