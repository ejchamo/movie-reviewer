import { Vote, Review, User } from "../../models/index.js";

class VoteSeeder {
  static async seed() {
    const dune2Review1 = await Review.query().findOne({ content: "soy good" });

    const tyler = await User.query().findOne({ email: "tyler@gmail.com" });
    const sky = await User.query().findOne({ email: "skylfw@launch.com" });
    const ej = await User.query().findOne({ email: "ej@aol.com" });

    const votesData = [
      {
        reviewId: dune2Review1.id,
        userId: sky.id,
        vote: 1,
      },
      {
        reviewId: dune2Review1.id,
        userId: ej.id,
        vote: 1,
      },
    ];

    for (const vote of votesData) {
      const currentVote = await Vote.query().findOne(vote);
      if (!currentVote) {
        await Vote.query().insert(vote);
      }
    }
  }
}

export default VoteSeeder;
