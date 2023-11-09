class VoteSerializer {
  static cleanVote(vote) {
    const allowedAttributes = ["id", "reviewId", "userId", "vote"];

    const serializedVote = {};
    for (const attribute of allowedAttributes) {
      serializedVote[attribute] = vote[attribute];
    }
    return serializedVote;
  }
}

export default VoteSerializer;
