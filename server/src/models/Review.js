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
    const { Movie, User } = require("./index.js");

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
    };
  }
}

module.exports = Review;
