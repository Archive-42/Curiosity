/* eslint-disable linebreak-style */

exports.up = (knex) => {
  return knex.schema.createTable("users", (users) => {
    users.increments();

    users.string("username", 128).notNullable().unique();

    users.string("password", 128).notNullable();

    users.string("email", 128).notNullable().unique();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("users");
};
