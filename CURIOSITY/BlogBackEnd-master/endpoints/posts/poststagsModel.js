const db = require("../../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
};

// get all rows in poststags table
function find() {
  return db("poststags").select("*");
}

// get all rows in poststags table matching filter
function findBy(filter) {
  return db("poststags").where(filter);
}

// create a row in poststags table
async function add(poststagsentry) {
  const [poststagsid] = await db("poststags").insert(
    poststagsentry,
    "poststagsid"
  );
  return findById(poststagsid);
}

// find a row in poststags table by poststagsid
function findById(poststagsid) {
  return db("poststags")
    .select("poststagsid", "*")
    .where({ poststagsid })
    .first();
}

// update a row in poststags table
function update(poststagsid, posttag) {
  return db("poststags").where({ poststagsid }).update(posttag);
}

// delete a row in poststags table
function remove(poststagsid) {
  return db("poststags").where("poststagsid", Number(poststagsid)).del();
}
