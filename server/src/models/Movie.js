const Model = require("./Model.js");

class Movie extends Model {
  static get tableName() {
    return "movies";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { User, Review } = require("./index.js");

    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "movies.id",
          to: "reviews.movieId",
        },
      },
    };
  }
}

module.exports = Movie;
