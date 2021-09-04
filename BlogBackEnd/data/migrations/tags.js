/* eslint-disable linebreak-style */

exports.up = (knex) => {
  return knex.schema.createTable("tags", (tags) => {
    tags.increments("tagsid");

    tags.string("tagname", 256).notNullable().unique();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("tags");
};
