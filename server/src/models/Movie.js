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
        imageUrl: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Review } = require("./index.js");

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
    const averageRating = await this.$relatedQuery("reviews").avg("rating");
    const floatAverage = parseFloat(averageRating[0].avg).toFixed(1);
    return floatAverage;
  }
}

module.exports = Movie;
