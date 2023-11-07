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
  async getAverage() {
    let averageRating = await this.$relatedQuery("reviews").avg("rating");
    averageRating = parseFloat(averageRating[0].avg).toFixed(1);
    return averageRating;
  }
}

module.exports = Movie;
