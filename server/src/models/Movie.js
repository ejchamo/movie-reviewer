const Model = require("./Model.js");

class Movie extends Model {
  static get tableName() {
    return "movies";
  }

  static jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
      },
    };
  }
}

module.exports = Movie;
