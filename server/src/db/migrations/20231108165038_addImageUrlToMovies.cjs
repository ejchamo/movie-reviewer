/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("movies", (table) => {
    table
      .string("imageUrl")
      .defaultTo(
        "https://amc-theatres-res.cloudinary.com/amc-cdn/static/images/fallbacks/DefaultOneSheetPoster.jpg"
      );
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("movies", (table) => {
    table.dropColumn("imageUrl");
  });
};
