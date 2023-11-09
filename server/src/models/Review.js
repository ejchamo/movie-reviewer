const Model = require("./Model.js");

class Review extends Model {
  static get tableName() {
    return "reviews";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["content", "rating"],
      properties: {
        content: { type: "string" },
        rating: {
          anyOf: [
            {
              type: "integer",
              minimum: 1,
              maximum: 10,
            },
            {
              type: "string",
              pattern: "^(0?[1-9]$|^10)$",
            },
          ],
        },
      },
    };
  }

  static get relationMappings() {
    const { Movie, User, Vote } = require("./index.js");

    return {
      movie: {
        relation: Model.BelongsToOneRelation,
        modelClass: Movie,
        join: {
          from: "reviews.movieId",
          to: "movies.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id",
        },
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "reviews.id",
          to: "votes.reviewId",
        },
      },
    };
  }

  async getVoteCount() {
    const voteCount = await this.$relatedQuery("votes").sum("vote");
    const intCount = parseInt(voteCount[0].sum);
    return intCount;
  }
}

module.exports = Review;
