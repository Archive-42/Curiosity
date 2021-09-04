const db = require("../../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
};

// return all users in users table
function find() {
  return db("users").select("id", "username", "email");
}

// return all users matching user-provided filter
function findBy(filter) {
  return db("users").where(filter);
}

// create a user/add a row to users table
async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}

// find a user by usersid in users table
function findById(id) {
  return db("users").select("id", "username", "email").where({ id }).first();
}

// update a user in users table
function update(id, user) {
  return db("users").where("id", Number(id)).update(user);
}

// delete a user in users table
function remove(id) {
  return db("users").where("id", Number(id)).del();
}
