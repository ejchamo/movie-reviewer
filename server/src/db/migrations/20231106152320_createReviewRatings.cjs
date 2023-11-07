/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("reviews", (table) => {
    table.integer("rating").notNullable().checkPositive().checkBetween([1, 10]);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("reviews", (table) => {
    table.dropColumn("rating");
  });
};
